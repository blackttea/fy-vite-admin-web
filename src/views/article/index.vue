<template>
  <div class="art-container">
    <div class="navigation-bar"></div>
    <div class="art-content">
      <div class="art-left"></div>
      <div class="art-main">
        <virtual-table :data="articleList" @search="getData">
          <template #row="{ data }">
            <div class="art-item">
              <div class="img-container">
                <img-icon :src="'../src/icons/img/head.png'" alt="" class="img-head" />
              </div>
              <div class="right-info">
                <div class="comment-container">
                  <div class="art-time">{{ data.time }}</div>
                  <div class="art-like">
                    <span class="no-wrap comment">
                      <svg-icon name="comment" />
                      {{ data.comment }}
                    </span>
                    <span class="no-wrap">
                      <svg-icon name="like" />
                      {{ data.like }}
                    </span>
                  </div>
                </div>
                <div class="title-container">{{ data.title }}</div>
              </div>
            </div>
          </template>
        </virtual-table>
      </div>
      <div class="art-right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import virtualTable from "@/components/virtualTable/index.vue"
import moment from "moment"

const articleList = reactive<any>([])
for (let i = 0; i < 12; i++) {
  articleList.push({
    id: i,
    title: `测试${i}`,
    comment: i,
    like: i,
    time: moment().format("YYYY-MM-DD HH:mm")
  })
}

const getData = () => {
  setTimeout(() => {
    const max = articleList[articleList.length - 1].id
    for (let i = 1; i <= 12; i++) {
      articleList.push({
        id: max + i,
        title: `测试${max + i}`,
        comment: max + i,
        like: max + i,
        time: moment().format("YYYY-MM-DD HH:mm")
      })
    }
  }, 2000)
}
</script>

<style scoped lang="scss">
@mixin inCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
$backColor: #f9f9f9;
.art-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .navigation-bar {
    width: 100%;
    height: 60px;
    box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
  }
  .art-content {
    height: calc(100% - 60px);
    display: flex;
    justify-content: space-between;
    width: 100%;
    .art-left {
      width: 300px;
      height: 100%;
      background-color: $backColor;
    }

    .art-main {
      width: calc(100% - 660px);
      min-width: 666px;
      overflow-y: auto;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      .art-item {
        width: 100%;
        height: 120px;
        opacity: 1;
        display: flex;
        align-items: center;
        border-radius: 5px;
        background: #f3f3f3;
        .img-container {
          width: 120px;
          height: 100%;
          @include inCenter;
          .img-head {
            width: 80px;
            height: 80px;
            border-radius: 50%;
          }
        }
        .right-info {
          width: calc(100% - 120px);
          height: 100%;
          .comment-container {
            width: 100%;
            height: 39px;
            padding: 0 8px 0 8px;
            display: flex;
            align-items: center;
            .art-time {
              width: 50%;
              text-align: left;
            }
            .art-like {
              width: 50%;
              display: flex;
              padding: 0 8px 0 0;
              justify-content: flex-end;
              .comment {
                margin-right: 10px;
              }
            }
          }
          .title-container {
            height: calc(100% - 39px);
            width: 100%;
            font-size: 14px;
            color: #409eff;
            padding: 8px;
            font-weight: bold;
          }
        }
      }
    }

    .art-right {
      width: 300px;
      height: 100%;
      background-color: $backColor;
    }
  }
}
</style>
