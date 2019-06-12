<template>
<div class="communitybuilding">
    <div class="communitybuilding_h">
        <img src="@/assets/img/1.jpeg">
        <div class="communitybuilding_ht">
            <p>社区委员会召开会议，以党建为引领，提升社区治理水平...<span>2018-12-24</span></p>
        </div>
    </div>
    <div class="communitybuilding_hw">
        <div class="communitybuilding_hwl">
            <h1>【要闻】</h1>
        </div>
        <div class="communitybuilding_hwr">
            <marquee>
           <font size=+1>习近平：奋力开创中部地区崛起新局面</font>
           <font size=+1>习近平：中纪委办公厅印发意见严把案件...</font>
           <font size=+1>习近平：中纪委办公厅印发意见严把案件...</font>
        </marquee>
        </div>
        <div style="clear:both"></div>
    </div>
    <div class="communitybuilding_l">
      <div class="communitybuilding_ll">
        <div class="communitybuilding_llt">
            <div class="communitybuilding_lltl">
                <h1>党建要闻</h1>
            </div>
            <div class="communitybuilding_lltr">
             <h1>更多》</h1>
            </div>
            <div style="clear:both"></div>
        </div>
        <div>

        </div>
         <ul class="communitybuilding_lll">
            <li>
                <div style="width:10px;height:10px;display:inline-block;background:rgba(248,191,18,1);border-radius:50%;"></div>
                <h1>武胜县礼安镇领导到大雨村参观指导工作</h1>
                <span>2019-05-21</span>
            </li>
            <li>
                <div style="width:10px;height:10px;display:inline-block;background:rgba(248,191,18,1);border-radius:50%;"></div>
                <h1>武胜县礼安镇领导到大雨村参观指导工作</h1>
                <span>2019-05-21</span>
            </li>
            <li>
                <div style="width:10px;height:10px;display:inline-block;background:rgba(248,191,18,1);border-radius:50%;"></div>
                <h1>武胜县礼安镇领导到大雨村参观指导工作</h1>
                <span>2019-05-21</span>
            </li>
            <li>
                <div style="width:10px;height:10px;display:inline-block;background:rgba(248,191,18,1);border-radius:50%;"></div>
                <h1>武胜县礼安镇领导到大雨村参观指导工作</h1>
                <span>2019-05-21</span>
            </li>
            <li>
                <div style="width:10px;height:10px;display:inline-block;background:rgba(248,191,18,1);border-radius:50%;"></div>
                <h1>武胜县礼安镇领导到大雨村参观指导工作</h1>
                <span>2019-05-21</span>
            </li>
        </ul>
      </div>
      <div class="communitybuilding_lr">
          <div class="communitybuilding_lrt">
         <h1>党建要闻</h1>
        </div>
        <div class="communitybuilding_lrr">
        </div>
        <div style="clear:both"></div>
          <div class="communitybuilding_lrm">
              <img src="@/assets/img/zx.png">
          </div>
          <div>
              
          </div>
      </div>
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    mounted () {
  },
  methods: {
   
  }
}
</script>
<style lang="scss" scoped>
.communitybuilding{
    padding: 0 20px;
    .communitybuilding_h{
        width: 100%;
        position: relative;
    }
    .communitybuilding_h img{
        width: 100%;
        height: 300px;
    }
    .communitybuilding_ht{
    position: absolute;
    line-height: 30px;
    width: 100%;
    bottom:0px;
    left:0px;
    z-index: 87;
    font-size: 14px;
    color: #FFFFFFFF;
    background-color:black;
    opacity: .6;
    text-align: left;
    }
     .communitybuilding_ht p{
        margin-left: 20px;
    }
    .communitybuilding_ht span{
        float: right;
        margin-right: 10px;
    }
    .communitybuilding_hwl{
        width: 7%;
        float: left;
        color:red;
    }
    .communitybuilding_hwr{
        width: 93%;
        float: right;
        color: #FFFFFF;
    }
    .communitybuilding_l{
        width: 100%;
        margin-top: 20px;
        display: flex;
        .communitybuilding_ll{
            width: 700px;
            padding: 0 10px;
             color: #FFFFFF;
             .communitybuilding_llt{
                width: 100%;
             }
             .communitybuilding_lltl{
                width:100px;
                line-height: 40px;
                text-align: center;
                // height:40px;
                background-color: #D01B2D;
                border-radius: 0px 40px 0px 0px;
                float: left;
            }
            .communitybuilding_lltr{
                width: 479px;
                line-height: 39px;
                float: right;
                text-align: right;
                border-bottom: 1px solid #ffffff;
            }
            .communitybuilding_lll li{
                line-height:35px;
            }
            .communitybuilding_lll h1{
                display:inline-block;
            }
            .communitybuilding_lll span{
                float: right;
            }
        }
        .communitybuilding_lr{
            width: 400px;
            padding: 0 10px;
            color: #FFFFFF;
            .communitybuilding_lrt{
                width:100px;
                line-height: 40px;
                text-align: center;
                // height:40px;
                background-color: #D01B2D;
                border-radius: 0px 40px 0px 0px;
                float: left;
            }
            .communitybuilding_lrr{
                width:296px;
                line-height: 39px;
                float: right;
                text-align: right;
                border-bottom: 1px solid #ffffff;
            }
            .communitybuilding_lrm{
                margin-top: 10px;
                width:396px;
                height:200px;
                border-radius:6px 6px 0px 0px;
            }
            .communitybuilding_lrm img{
                width: 100%;
            }    
        }
    }
}

</style>

