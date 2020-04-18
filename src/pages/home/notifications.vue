<template>
  <div class="group-line">
    <div class="left">
      <div class="classify">
        <ul class="classify-item display">
          <li @click="changeConditions('display','inbox')" :class="conditions.display==='inbox'?'selected':''">
            <svg width="14" height="16" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M14 9l-1.13-7.14c-.08-.48-.5-.86-1-.86H2.13c-.5 0-.92.38-1 .86L0 9v5c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V9zm-3.28.55l-.44.89c-.17.34-.52.56-.91.56H4.61c-.38 0-.72-.22-.89-.55l-.44-.91c-.17-.33-.52-.55-.89-.55H1l1-7h10l1 7h-1.38c-.39 0-.73.22-.91.55l.01.01z"></path>
            </svg>
            <a href="javascript:void(0)">Inbox</a>
          </li>
          <li @click="changeConditions('display','saved')" :class="conditions.display==='saved'?'selected':''">
            <svg width="16" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 0H4c-.73 0-1 .27-1 1v15l5-3.09L13 16V1c0-.73-.27-1-1-1z"></path>
            </svg>
            <a href="javascript:void(0)">Saved</a>
          </li>
          <li @click="changeConditions('display','done')" :class="conditions.display==='done'?'selected':''">
            <svg width="12" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
            </svg>
            <a href="javascript:void(0)">Done</a>
          </li>
        </ul>
        <ul class="classify-item filters">
          <div class="title">Filter</div>
          <li @click="changeConditions('filter','assigned')" :class="conditions.filter==='assigned'?'selected':''">
            <img src="" alt="">
            <a href="javascript:void(0)">Assigned</a>
            <span>12</span>
          </li>
          <li @click="changeConditions('filter','participating')" :class="conditions.filter==='participating'?'selected':''">
            <img src="" alt="">
            <a href="javascript:void(0)">Participating</a>
            <span>9</span>
          </li>
          <li @click="changeConditions('filter','mentioned')" :class="conditions.filter==='mentioned'?'selected':''">
            <img src="" alt="">
            <a href="javascript:void(0)">Mentioned</a>
            <span></span>
          </li>
          <li @click="changeConditions('filter','team')" :class="conditions.filter==='team'?'selected':''">
            <img src="" alt="">
            <a href="javascript:void(0)">Team mentioned</a>
            <span></span>
          </li>
          <li @click="changeConditions('filter','review')" :class="conditions.filter==='review'?'selected':''">
            <img src="" alt="">
            <a href="javascript:void(0)">Review requested</a>
            <span></span>
          </li>
        </ul>
        <ul class="classify-item repository">
          <div class="title">Repository</div>
          <li @click="changeConditions('repository',1)" :class="conditions.repository===1?'selected':''">yougtao/Gityou</li>
          <li>yougtao/ebuy</li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="right-nav">
        <div v-if="conditions.display==='inbox'" class="btn-group">
          <button @click="changeConditions('read','all')" class="left" :class="conditions.read==='all'?'selected':''">所有</button>
          <button @click="changeConditions('read','unread')" class="right" :class="conditions.read==='unread'?'selected':''">未读</button>
        </div>
      </div>
      <div class="notifications-wrap">
        <div class="title">通知</div>
        <div class="main">
          <ul>
            <li class="notification-item">
              <div class="sign">
                <svg width="14" height="16" aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
                </svg>
              </div>
              <a href="javascript:void(0)" class="main">
                <span class="origin">yougtao/Gityou-portal #1</span>
                <span class="title">build(deps-dev): bump webpack-bundle-analyzer from 2.13.1 to 3.6.0</span>
              </a>
              <div class="details">
                <span class="label">manual</span>
                <span class="time">6天前</span>
              </div>
              <div class="btn">
                <span class="btn-done">
                  <svg width="12" height="16" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
                  </svg>
                </span>
                <span class="btn-unsubscribe">
                  <svg width="16" height="16" aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"></path>
                  </svg>
                </span>
                <span class="btn-save">
                  <svg width="16" height="16" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12 0H4c-.73 0-1 .27-1 1v15l5-3.09L13 16V1c0-.73-.27-1-1-1z"></path></svg>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notifications',
  data() {
    return {
      conditions: {
        display: 'inbox',
        read: 'all',
        filter: '',
        repository: 0
      },
      message: []
    }
  },
  methods: {
    changeConditions(condition, value) {
      this.conditions[condition] = value
      if (condition === 'display') {

      } else if (condition === 'read') {

      }
    }
  }
}
</script>

<style scoped>
.group-line {
  margin-top: 20px;
}

.group-line > .left {
  margin-left: 20px;
}

.group-line > .right {
  width: 100%;
}

.classify {
  font-weight: 300;
  font-size: 14px;
}

.classify ul {
  margin: 10px 0;
  border-bottom: 1px solid #dfe2e5;
  width: 260px;
  list-style: none;
}

.classify li {
  display: block;
  margin-bottom: 5px;
  border-radius: 3px;
  padding: 8px 10px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}

.classify li:not(.selected):hover {
  background-color: #eaecef;
}

.classify li.selected {
  color: #fff;
  background-color: #0366d6;
}

.classify li.selected a {
  color: #fff;
}

.classify li a:hover {
  text-decoration-line: none;
}

.classify-item .title {
  padding: 5px 10px;
  color: #586069;
  font-size: 13px;
  font-weight: 600;
  user-select: none;
}

.classify-item svg {
  width: 16px;
}

.classify-item img {
  width: 16px;
  height: 16px;
}

.classify-item span {
  float: right;
}

/* 右侧 */
.right-nav {
  margin: 10px 0;
}


/* 右侧主区域 */
.notifications-wrap {
  border: 1px solid #d1d5da;
  border-radius: 3px;
  font-size: 14px;
  min-width: 600px;
}

.notifications-wrap > .title {
  border-bottom: 1px solid #d1d5da;
  padding: 8px 10px;
  font-weight: 600;
}

.notification-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  list-style: none;
}

.notification-item:not(:last-child) {
  border-bottom: 1px solid #e1e4e8;
}

.notification-item:hover {
  background-color: #f1f8ff;
}

.notification-item > * {
  display: inline-block;
}

.notification-item > .sign {
  margin: auto 10px;
}

.notification-item > a:hover {
  text-decoration-line: none;
}

.notification-item > .main {
  padding: 8px 10px;
  width: 100%;
}

.notification-item > .main > .origin {
  display: block;
  font-size: 13px;
  line-height: 1.5;
}

.notification-item > .main > .title {
  display: block;
  font-size: 14px;
}

.notification-item > .details {
  display: inline-flex;
  justify-content: space-between;
  margin: auto 10px;
  line-height: 22px;
  width: 300px;
}

.notification-item .btn {
  position: absolute;
  display: none;
  height: 100%;
  line-height: 52px;
  right: 5px;
  z-index: 5;
}

.notification-item:hover .btn {
  display: inline-block;
  background-color: #f1f8ff;
}

.notification-item .btn > span {
  border-radius: 3px;
  padding: 8px;
  cursor: pointer;
}

.notification-item .btn > span:hover {
  background-color: #e1e4e8;
}

</style>