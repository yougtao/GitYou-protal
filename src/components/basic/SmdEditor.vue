<template>
  <div class="mditor-mini" :title="false" :commit="commit">
    <div v-if="title" class="mditor-title">
      title
    </div>
    <div class="mditor-mini-bar">
      <div class="mditor-mini-tab">
        <a @click="switchEdit" href="javascript:void(0)" title="编辑" class="mditor-btn mditor-btn-edit active"><i
            class="mditor-icon "></i><span>编辑</span></a>
        <a @click="switchPreview" href="javascript:void(0)" title="预览" class="mditor-btn mditor-btn-preview"><i
            class="mditor-icon "></i><span>预览</span></a>
      </div>
      <div class="mditor-mini-side">
        <a @click="action('image')" href="javascript:void(0)" class="mditor-btn">图</a>
      </div>
      <div class="mditor-mini-side">
        <a @click="action('unordered_list')" href="javascript:void(0)" class="mditor-btn">
          <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M2 13c0 .59 0 1-.59 1H.59C0 14 0 13.59 0 13c0-.59 0-1 .59-1h.81c.59 0 .59.41.59 1H2zm2.59-9h6.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1H4.59C4 2 4 2.41 4 3c0 .59 0 1 .59 1zM1.41 7H.59C0 7 0 7.41 0 8c0 .59 0 1 .59 1h.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1h.01zm0-5H.59C0 2 0 2.41 0 3c0 .59 0 1 .59 1h.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1h.01zm10 5H4.59C4 7 4 7.41 4 8c0 .59 0 1 .59 1h6.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1h.01zm0 5H4.59C4 12 4 12.41 4 13c0 .59 0 1 .59 1h6.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1h.01z"></path>
          </svg>
        </a>
        <a @click="action('ordered_list')" href="javascript:void(0)" class="mditor-btn">
          <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M12.01 13c0 .59 0 1-.59 1H4.6c-.59 0-.59-.41-.59-1 0-.59 0-1 .59-1h6.81c.59 0 .59.41.59 1h.01zM4.6 4h6.81C12 4 12 3.59 12 3c0-.59 0-1-.59-1H4.6c-.59 0-.59.41-.59 1 0 .59 0 1 .59 1zm6.81 3H4.6c-.59 0-.59.41-.59 1 0 .59 0 1 .59 1h6.81C12 9 12 8.59 12 8c0-.59 0-1-.59-1zm-9.4-6h-.72c-.3.19-.58.25-1.03.34V2h.75v2.14H.17V5h2.84v-.86h-1V1zm.392 8.12c-.129 0-.592.04-.802.07.53-.56 1.14-1.25 1.14-1.89C2.72 6.52 2.18 6 1.38 6c-.59 0-.97.2-1.38.64l.58.58c.19-.19.38-.38.64-.38.28 0 .48.16.48.52 0 .53-.77 1.2-1.7 2.06V10h3v-.88h-.598zm-.222 3.79v-.03c.44-.19.64-.47.64-.86 0-.7-.56-1.11-1.44-1.11-.48 0-.89.19-1.28.52l.55.64c.25-.2.44-.31.69-.31.27 0 .42.13.42.36 0 .27-.2.44-.86.44v.75c.83 0 .98.17.98.47 0 .25-.23.38-.58.38-.28 0-.56-.14-.81-.38l-.48.66c.3.36.77.56 1.41.56.83 0 1.53-.41 1.53-1.16 0-.5-.31-.81-.77-.94v.01z"></path>
          </svg>
        </a>
        <a @click="action('task_list')" href="javascript:void(0)" class="mditor-btn">
          <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M15.41 9H7.59C7 9 7 8.59 7 8c0-.59 0-1 .59-1h7.81c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM9.59 4C9 4 9 3.59 9 3c0-.59 0-1 .59-1h5.81c.59 0 .59.41.59 1 0 .59 0 1-.59 1H9.59zM0 3.91l1.41-1.3L3 4.2 7.09 0 8.5 1.41 3 6.91l-3-3zM7.59 12h7.81c.59 0 .59.41.59 1 0 .59 0 1-.59 1H7.59C7 14 7 13.59 7 13c0-.59 0-1 .59-1z"></path>
          </svg>
        </a>
      </div>
      <div class="mditor-mini-side">
        <a @click="action('quote')" href="javascript:void(0)" class="mditor-btn">
          <svg viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M6.16 3.5C3.73 5.06 2.55 6.67 2.55 9.36c.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.9 0-2.99-1.52-2.99-4.25 0-3.8 1.75-6.53 5.02-8.42L6.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.89 0-2.98-1.52-2.98-4.25 0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z"></path>
          </svg>
        </a>
        <a @click="action('code')" href="javascript:void(0)" class="mditor-btn">
          <svg viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
            <path fill-rule="evenodd" d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"></path>
          </svg>
        </a>
        <a @click="action('precode')" href="javascript:void(0)" class="mditor-btn">
          <svg viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
            <path fill-rule="evenodd" d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"></path>
          </svg>
        </a>
        <a @click="action('link')" href="javascript:void(0)" class="mditor-btn">
          <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
          </svg>
        </a>
      </div>
      <div class="mditor-mini-side">
        <a @click="action('head')" href="javascript:void(0)" class="mditor-btn">
          <svg viewBox="0 0 18 16" version="1.1" width="18" height="16" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M13.62 9.08L12.1 3.66h-.06l-1.5 5.42h3.08zM5.7 10.13S4.68 6.52 4.53 6.02h-.08l-1.13 4.11H5.7zM17.31 14h-2.25l-.95-3.25h-4.07L9.09 14H6.84l-.69-2.33H2.87L2.17 14H0l3.3-9.59h2.5l2.17 6.34L10.86 2h2.52l3.94 12h-.01z"></path>
          </svg>
        </a>
        <a @click="action('bold')" href="javascript:void(0)" class="mditor-btn">
          <svg viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M1 2h3.83c2.48 0 4.3.75 4.3 2.95 0 1.14-.63 2.23-1.67 2.61v.06c1.33.3 2.3 1.23 2.3 2.86 0 2.39-1.97 3.52-4.61 3.52H1V2zm3.66 4.95c1.67 0 2.38-.66 2.38-1.69 0-1.17-.78-1.61-2.34-1.61H3.13v3.3h1.53zm.27 5.39c1.77 0 2.75-.64 2.75-1.98 0-1.27-.95-1.81-2.75-1.81h-1.8v3.8h1.8v-.01z"></path>
          </svg>
        </a>
        <a @click="action('italic')" href="javascript:void(0)" class="mditor-btn">
          <svg viewBox="0 0 6 16" version="1.1" width="6" height="16" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M2.81 5h1.98L3 14H1l1.81-9zm.36-2.7c0-.7.58-1.3 1.33-1.3.56 0 1.13.38 1.13 1.03 0 .75-.59 1.3-1.33 1.3-.58 0-1.13-.38-1.13-1.03z"></path>
          </svg>
        </a>
      </div>
    </div>
    <div class="mditor-main">
      <div id="md_preview" class="mditor-mini-preview article"></div>
      <div class="mditor-mini-edit"><textarea id="md_editor"></textarea></div>
    
    </div>
    <div class="mditor-buttons">
      <div class="mditor-btn-commit"></div>
      <button @click="btn_action">提交</button>
    </div>
  </div>
</template>

<script>
import {doMaked, selection_factory} from '../../assets/js/maked.js'

export default {
  name: 'SmdEditor',
  props: {
    title: false,
    commit: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      action_config: {
        head: '### ',
        bold: '**{{加粗}}**',
        italic: '*{{斜体}}*',
        quote: '> ',
        code: '`{{code}}`', //代码
        precode: '\n\n```javascript\n{{//some code……}}\n```', //代码域
        link: '[{{链接文字}}](http://)',  //链接
        unordered_list: '- ',
        ordered_list: '1. ',
        task_list: '- [] ',
        image: '![{{图片描述}}](http://)',  //图片
        tab: '  '
      },
      log: {
        data: [],
        current: -1,
        maxLength: 20
      }
    }
  },
  mounted() {
    this._$btn_edit = document.getElementsByClassName('mditor-btn-edit')[0]
    this._$btn_preview = document.getElementsByClassName('mditor-btn-preview')[0]
    this._$textarea = document.getElementById('md_editor')
    this._$viewer = document.getElementById('md_preview')

    this.maked = doMaked()
    // this.utils = selection_factory(document)

  },
  methods: {
    switchPreview() {
      this._$textarea.style.display = 'none'
      // 渲染 view
      let content = this._$textarea.value
      if (content === '')
        this._$viewer.innerHTML = '<p>Nothing to preview</p>'
      else {
        this._$viewer.innerHTML = this.maked(content)
      }
      this._$viewer.style.display = 'block'
      this._$btn_edit.classList.remove('active')
      this._$btn_preview.classList.add('active')
    },
    switchEdit() {
      this._$textarea.style.display = 'block'
      this._$viewer.style.display = 'none'
      this._$btn_edit.classList.add('active')
      this._$btn_preview.classList.remove('active')
    },
    action(name) {
      let config = this.action_config[name]
      //第一顺序，执行action_config的插入方法
      if (typeof (config) == 'string') {
        let selection_txt = this.utils.getPosition(this._$textarea)[2]
        config = config.replace(/{{(.+?)}}/, function (a, b) {
          return selection_txt ? selection_txt : b
        })
        this.utils.insertTxt(this._$textarea, config)
        let lastIndex = this._$textarea.value.lastIndexOf('\n')
        if (lastIndex == -1)
          console.log(typeof this._$textarea.value)
        this._logMe()
      } else if (typeof (config) == 'function') {
        //第二顺序，检查action_config是否为function
        config.call(this)
      } else if (typeof (this[name]) == 'function') {
        //第三顺序,从自身原型链上找方法
        this[name].call(this)
      }
    },
    _logMe(val) {
      let item = {
        selection: this.utils.getPosition(this._$textarea),
        content: val || this._$textarea.value
      }
      if (this.log.data.length > this.log.current + 1) {
        this.log.data.length = this.log.current + 1
      }
      this.log.current++
      this.log.data.push(item)
      if (this.log.data.length > this.log.maxLength) {
        this.log.data = this.log.data.slice(-this.log.maxLength)
        this.log.current = this.log.maxLength - 1
      }
    },
    _undo() {
      if (this.log.current <= 0) {
        return
      }
      return this.log.data[--this.log.current]
    },
    _redo() {
      if (this.log.data.length > this.log.current + 1) {
        return this.log.data[++this.log.current]
      } else {
        return null
      }
    },
    btn_action() {
      this.commit && this.commit(this._$textarea.value)
    }
  }
}
</script>

<style>
@import '../../assets/css/code_style/article.css';
</style>

<style scoped>
.mditor-mini {
  position: relative;
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #fff;
}

.mditor-mini-bar {
  height: 36px;
  padding: 8px 8px 0;
  border-bottom: 1px solid #d1d5da;
  background: #f6f8fa;
}

.mditor-mini-tab {
  float: left;
}

.mditor-mini-side {
  float: right;
  margin: auto 8px;
}

.mditor-mini-tab .mditor-btn {
  display: inline-block;
  vertical-align: middle;
  padding: 0 12px;
  height: 36px;
  line-height: 36px;
  color: #333;
  font-size: 14px;
  text-decoration: none;
}

.mditor-mini-tab .mditor-btn span {
  display: inline-block;
  vertical-align: middle;
  height: 24px;
  line-height: 24px;
}

.mditor-btn svg {
  fill: currentColor;
}

.mditor-mini-tab .mditor-btn.active {
  background: #fff;
  border: 1px solid #d1d5da;
  border-bottom: none;
  border-radius: 3px 3px 0 0;
  color: #000;
}

.mditor-mini-side .mditor-btn {
  display: inline-block;
  vertical-align: middle;
  margin: 0 2px;
  padding: 0 2px;
  line-height: 36px;
  color: #333;
}

.mditor-mini-side .mditor-btn:hover {
  color: #0366d6;
}

.mditor-icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  vertical-align: middle;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAPCAYAAABwfkanAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqtJREFUeNrUllmIjWEYx883xjAyGGtjKZQL0mkkuSAiFJncMBcYIs2NZA2RpexTk2WSseRopETCnKLckQuDso7cWHJlG9myc/we/b/T29t3zpkckqd+8513+573fd7/83wTpFKp2P9mhfYnCIJsc2xwDEyEMrgO+/7lYQNznmPTZkm4A4dgJ1xh3ba8nQdBA4/v8B7uWTAipk2HsdDBgozfubEcEauAKTAMDkAX9Z+2dfmCnYI49Ic+UBxBL40PgP22rjDLhkdBNeyAG1AKR2ER3HKi5a7pB1Vy8g1+QHt4aQeFpnCiNv0cPsNy6Cwfvr2DD1ALD9OajrAhsBo2y1ECrsE5qIMnEWvmwAwdcA98gTbwEabCKmiGdc4aO0yJDpnJSkQ3eOOe2LVB0vAktWugQb/LNDbCuWKzZeqPq10ufe6FSvWV6vAJx2873U6jciVKHiv0bpNo0a913qa7a0KV2hvVjikaSSWFq8t56u+qeXG1R8JA730xbXq947e35tRkiPRCjZeHfgu8a0hIe6bdpTBcydhDsjgMF72XjoaV8ErtydJek54nlMyhrbGbyqfqFDj12nR4WRubCeNhmsat74wO5NsC6CjpmJ1XhMNIVyoXQtuq/AjlYbq3sLfNII9i53tR5NbpIxJ6hZLJkmoWvNXVXFCkY172h9VjMUyAtXBbV1mt6mE3c1LyqdUG58vvJn6fhQ2tCLBVsaGsqw+rhxXuFmX4YFiiDTeqGtTleOFuVYItcBOOwy6neliZHAd3Tc9eDllJe9yKkteiOemS90jyqJfDB3re95xks2NwCWYr8m6dfgHb4aq3pqckYjfw1ckL1zpJIoHklpZHUvrtK82Zs6dKsEj7E/97eJ/xZgUt52c83PRBOj7BM9Xp14pW7G9u+nftpwADABwSFeQIwYanAAAAAElFTkSuQmCC)
}

.mditor-btn-preview i {
  background-position: -15px 0;
}

/* main 区域*/
.mditor-main {
  padding: 8px;
  min-height: 160px;
}

.mditor-mini-preview {
  display: none;
  padding: 8px;
  height: 100%;
}

.mditor-mini-edit {
  padding: 8px;
}

.mditor-main textarea {
  border: 1px solid #d1d5da;
  border-radius: 3px;
  resize: vertical;
  box-sizing: border-box;
  width: 100%;
  min-height: 140px;
  background-color: #fafbfc;
  font-size: 14px;
}

.mditor-mini textarea:focus {
  outline: none;
}

/* 按钮*/
.mditor-buttons {
  margin: 8px;
  height: 34px;
}

.mditor-btn-commit {

}

.mditor-buttons button {
  display: inline-block;
  float: right;
  border: 1px solid rgba(27, 31, 35, .2);
  border-radius: 3px;
  padding: 6px 12px;
  background-color: #28a745;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
  cursor: pointer;
}

@media screen and (max-width: 700px) {
  .mditor_input {
    width: 100%;
  }
  
  .mditor_view {
    width: 100%;
    display: none;
  }
  
  .mditor_preview {
    visibility: visible;
  }
  
  .mditor_viewer {
    left: 0px;
  }
}
</style>