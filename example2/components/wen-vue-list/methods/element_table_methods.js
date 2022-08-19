export default {
    clearSelection: function() {
        this.$refs['wen-'+this.defaultConfig.viewType].clearSelection()
    },
    toggleRowSelection: function(row, selected) {
        this.defaultConfig.viewType == 'list' && this.$refs['wen-'+this.defaultConfig.viewType].toggleRowSelection(row, selected)
    },
    toggleAllSelection: function() {
        this.$refs['wen-'+this.defaultConfig.viewType].toggleAllSelection()
    },
    toggleRowExpansion: function(row, expanded) {
        this.defaultConfig.viewType == 'list' && this.$refs['wen-'+this.defaultConfig.viewType].toggleRowExpansion(row, expanded)
    },
    setCurrentRow: function(row) {
        this.defaultConfig.viewType == 'list' && this.$refs['wen-'+this.defaultConfig.viewType].setCurrentRow(row)
    },
    clearSort: function() {
        this.defaultConfig.viewType == 'list' && this.$refs['wen-'+this.defaultConfig.viewType].clearSort()
    },
    clearFilter: function(columnKey) {
        this.defaultConfig.viewType == 'list' && this.$refs['wen-'+this.defaultConfig.viewType].clearFilter(columnKey)
    },
    doLayout: function() {
        this.defaultConfig.viewType == 'list' && this.$refs['wen-'+this.defaultConfig.viewType].doLayout()
    },
    sort: function(params) {
        this.defaultConfig.viewType == 'list' && this.$refs['wen-'+this.defaultConfig.viewType].sort(params)
    }
}