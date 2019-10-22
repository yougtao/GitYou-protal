<template>
  <div class="selection-component">
    <div class="selection-show" @click="toggleDrop">
      <span :class="{'active': isDrop}">{{ selectionValue }}</span>
      <span v-if="isDrop"><img class="show-img" src="../../../asset/images/ic-收起.svg" alt=""></span>
      <span v-else><img class="show-img" src="../../../asset/images/展开.svg" alt=""></span>
    </div>
    <div class="selection-list" v-if="isDrop">
      <ul>
        <li :class="{'active': index===nowIndex}" v-for="(item, index) in selections" @click="chooseSelection(index)" :key="index">{{
          item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Dropdown',
  props: ['scale', 'selections'],
  data() {
    return {
      isDrop: false,
      nowIndex: 0
    }
  },
  computed: {
    selectionValue() {
      return this.selections.length === 0 ? '' : this.selections[this.nowIndex].label
    }
  },
  methods: {
    j(num) {
      return this.scale * num
    },
    toggleDrop() {
      this.isDrop = !this.isDrop
    },
    chooseSelection(index) {
      this.nowIndex = index
      this.isDrop = false
      this.$emit('on-change', this.selections[this.nowIndex].value)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>

.selection-component {
  width: 180px;
  height: 40px;
  position: relative;
  
  .selection-show {
    
    width: 100%;
    
    height: 100%;
    
    display: flex;
    
    align-items: center;
    
    justify-content: flex-end;
    
    cursor: pointer;
    
    .active {
      
      color: #00DADA;
      
    }
    
    &:hover {
      
      span {
        
        color: #00DADA;
        
      }
      
    }
    
    span {
      
      font-size: 18px;
      
      font-family: PingFangSC-Regular;
      
      font-weight: 400;
      
      color: rgba(155, 157, 169, 1);
      
      line-height: 25px;
      
      display: flex;
      
      align-items: center;
      
      margin-left: 2px;
      .show-img {
        width: 14px;
        height: 7px;
      }
    }
  }
  
  .selection-list {
    position: absolute;
    right: 0;
    top: 40px;
    width: 166px;
    height: 425px;
    background: #001626;
    box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    z-index: 2005;
    overflow: auto;
    
    ul {
      .active {
        color: #00DADA;
      }
      
      li {
        height: 40px;
        padding-left: 30px;
        font-size: 14px;
        font-family: NotoSansCJKsc-Regular;
        font-weight: 400;
        color: rgba(230, 250, 250, 1);
        line-height: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        
        &:hover {
          background: rgba(0, 75, 100, 1);
        }
        
        cursor: pointer;
      }
    }
  }
}
</style>