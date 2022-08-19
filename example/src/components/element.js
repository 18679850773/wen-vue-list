import Vue from 'vue';
import ELEMENT from 'element-ui';

import CascaderPanel from './element-ui/CascaderPanel'
import Cascader from './element-ui/Cascader';
import FormItem from './element-ui/FormItem.vue';

export default class RegisterBSComponents {
    static register() {
        // Vue.component("el-button",ELEMENT.Button)
        Vue.component("el-row",ELEMENT.Row)
        Vue.component("el-col",ELEMENT.Col)
        Vue.component("el-container",ELEMENT.Container)
        Vue.component("el-header",ELEMENT.Header)
        Vue.component("el-aside",ELEMENT.Aside)
        Vue.component("el-form",ELEMENT.Form)
        Vue.component("el-form-item",FormItem)
        Vue.component("el-radio-group",ELEMENT.RadioGroup)
        Vue.component("el-radio",ELEMENT.Radio)
        Vue.component("el-radio-button",ELEMENT.RadioButton)
        Vue.component("el-checkbox-group",ELEMENT.CheckboxGroup)
        Vue.component("el-checkbox",ELEMENT.Checkbox)
        Vue.component("el-checkbox-button",ELEMENT.CheckboxButton)
        Vue.component("el-input",ELEMENT.Input)
        Vue.component("el-input-number",ELEMENT.InputNumber)
        Vue.component("el-select",ELEMENT.Select)
        Vue.component("el-cascader",Cascader)
        Vue.component("el-switch",ELEMENT.Switch)
        Vue.component("el-slider",ELEMENT.Slider)
        Vue.component("el-time-select",ELEMENT.TimeSelect)
        Vue.component("el-time-picker",ELEMENT.TimePicker)
        Vue.component("el-date-picker",ELEMENT.DatePicker)
        Vue.component("el-upload",ELEMENT.Upload)
        Vue.component("el-rate",ELEMENT.Rate)
        Vue.component("el-color-picker",ELEMENT.ColorPicker)
        Vue.component("el-transfer",ELEMENT.Transfer)
        Vue.component("el-option",ELEMENT.Option)
        Vue.component("el-option-group",ELEMENT.OptionGroup)
        Vue.component("el-table",ELEMENT.Table)
        Vue.component("el-table-column",ELEMENT.TableColumn)
        Vue.component("el-tab-pane",ELEMENT.TabPane)
        Vue.component("el-tabs",ELEMENT.Tabs)
        Vue.component("el-tag",ELEMENT.Tag)
        Vue.component("el-tooltip",ELEMENT.Tooltip)
        Vue.component("el-tree",ELEMENT.Tree)
        Vue.component("el-progress",ELEMENT.Progress)
        Vue.component("el-popover",ELEMENT.Popover)
        Vue.component("el-pagination",ELEMENT.Pagination)
        Vue.component("el-badge",ELEMENT.Badge)
        Vue.component("el-alert",ELEMENT.Alert)
        Vue.component("el-icon",ELEMENT.Icon)
        Vue.component("el-scrollbar",ELEMENT.Scrollbar)

        Vue.use(ELEMENT.Loading.directive);

        Vue.prototype.$loading = ELEMENT.Loading.service;
        Vue.prototype.$msgbox = ELEMENT.MessageBox;
        Vue.prototype.$alert = ELEMENT.MessageBox.alert;
        Vue.prototype.$confirm = ELEMENT.MessageBox.confirm;
        Vue.prototype.$prompt = ELEMENT.MessageBox.prompt;
        Vue.prototype.$notify = ELEMENT.Notification;
        Vue.prototype.$message = ELEMENT.Message;
        window.$message = ELEMENT.Message;

        Vue.component("el-menu",ELEMENT.Menu)
        Vue.component("el-menu-item",ELEMENT.MenuItem)
        Vue.component("el-menu-item-group",ELEMENT.MenuItemGroup)
        Vue.component("el-dropdown-menu",ELEMENT.DropdownMenu)
        Vue.component("el-dropdown",ELEMENT.Dropdown)
        Vue.component("el-dropdown-item",ELEMENT.DropdownItem)
        Vue.component("el-breadcrumb",ELEMENT.Breadcrumb)
        Vue.component("el-breadcrumb-item",ELEMENT.BreadcrumbItem)
        Vue.component("el-steps",ELEMENT.Steps)
        Vue.component("el-step",ELEMENT.Step)
        Vue.component("el-submenu",ELEMENT.Submenu)
        Vue.component("el-dialog",ELEMENT.Dialog)
        Vue.component("el-carousel-item",ELEMENT.CarouselItem)
        Vue.component("el-carousel",ELEMENT.Carousel)
        Vue.component("el-card",ELEMENT.Card)
        Vue.component("el-collapse",ELEMENT.Collapse)
        Vue.component("el-collapse-item",ELEMENT.CollapseItem)
        Vue.component("el-autocomplete",ELEMENT.Autocomplete)
        Vue.component("el-button-group",ELEMENT.ButtonGroup)
        Vue.component("el-footer",ELEMENT.Footer)
        Vue.component("el-divider",ELEMENT.Divider) //新增
        Vue.component("el-cascader-panel",CascaderPanel) //新增
        Vue.component("el-image",ELEMENT.Image)
        Vue.component("el-main",ELEMENT.Main)

    }
}