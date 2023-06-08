import { mapState } from 'pinia'
import { useAuthUserStore } from '@/store/modules/user'

export default {
  name: 'Mixin',
  props: {
    enableEditMode: {
      type: Boolean,
      default: false
    },
    replaceUrl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentRow: null,
      listQuery: {
        page: 1,
        perPage: 20
      },
      viewerOptions: {
        toolbar: true,
        url: 'data-source'
      },
      pageSizes: [20, 50, 100, 200, 500, 1000, 2000],
      page: { total: 0 },
      list: [],
      isLoading: false,
      activeName: '',
      lastActiveName: '',
      isEdit: false,
      dialogVisible: false
    }
  },
  computed: {
    ...mapState(useAuthUserStore, ['roles', 'userInfo'])
  },
  created() {
  },
  methods: {
    listIndex(index) {
      return (this.page.currentPage - 1) * this.page.perPage + index + 1
    },
    getList() {
    },
    onSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    onClear(refresh = true) {
      this.listQuery = {}
      this.listQuery = { page: 1, perPage: 20 }
      if (refresh) {
        this.getList()
      }
    },
    beforeGetList() {
      this.isLoading = true

      if (this.replaceUrl) {
        this.$router.replace({ path: this.$route.path, query: this.listQuery })
      }
    },
    afterGetList(response = null, error = null) {
      if (response) {
        this.list = response.items
        this.page = response.page
      }
      if (error) {
        // console.log(error)
      }
      setTimeout(() => {
        this.isLoading = false
      }, 200)
    },
    setCurrentRow(row) {
      this.currentRow = row
    },
    isShowColumn(item, activeName) {
      if (item.show) {
        const index = item.show.findIndex(item => item === activeName)
        return index !== -1
      } else {
        return true
      }
    },
    intersection(a, b) {
      const s = new Set(b)
      return [...new Set(a)].filter(x => s.has(x)).length > 0
    },
    // 获取当前的查询列表传入的角色，如果传入的角色在角色数组里，那么用传入的角色，如果不在，那就默认为空
    getQueryRole(defaultRole) {
      let role
      if (this.roles && this.roles.length > 0) {
        const index = this.roles.findIndex(item => item === defaultRole)
        if (index !== -1) {
          role = defaultRole
        }
      }
      return role
    },
    // 切换tab页
    changeTab(defaultArguments, tabs) {
      const name = defaultArguments[0].name
      if (this.lastActiveName !== name) {
        this.lastActiveName = name
        const index = tabs.findIndex(item => item.name === name)
        if (index !== -1) {
          this.getList()
        }
      }
    },
    getQuery(listQuery) {
      const query = {}
      Object.keys(listQuery).forEach(key => {
        query[key] = listQuery[key] ? listQuery[key] : (listQuery[key] === false ? listQuery[key] : undefined)
      })
      return query
    }
  }
}

