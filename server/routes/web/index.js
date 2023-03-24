module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  // const News = require('../../models/Article')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻咨询'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ['星梦设计大赛优秀创意奖公布', '蒙犽源梦皮肤设计大赛最终投票公告', '蒙犽源梦皮肤设计大赛优秀创意奖、人气创意奖公布', '3月23日全服不停机更新公告', '街机神作！《合金弹头：觉醒》手游正式定档四月上线！', '星梦设计大赛优秀创意奖公布', '蒙犽源梦皮肤设计大赛最终投票公告', '蒙犽源梦皮肤设计大赛优秀创意奖、人气创意奖公布', '街机神作！《合金弹头：觉醒》手游正式定档四月上线！', '星梦大赛首轮投票启动，让你的大乔万里挑“一”！', '3月24日体验服停机更新公告', '3月24日全服不停机更新公告', '3月23日体验服停机更新公告', '3月23日英雄平衡性调整丨杨玉环、公孙离增强，雅典娜平衡', '3月23日全服不停机更新公告', '星梦设计大赛优秀创意奖公布', '蒙犽源梦皮肤设计大赛最终投票公告', '蒙犽源梦皮肤设计大赛优秀创意奖、人气创意奖公布', '【星福利日-送星会员经验】活动开启公告', '《古今物语》活动开启公告', '2023年K甲春季赛正式开赛，全员集结群雄逐鹿', '2023年王者荣耀甲级职业联赛（K甲）赛事规则', '23KPL春季赛常规赛第一轮门票将于2月3日12：00开售！', '2023年KPL王者荣耀职业联赛春季赛常规赛第一轮赛程', '王者荣耀职业联赛（KPL）2023春季赛赛事规则']
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title
      }

    })
    res.send(newsList)
  })


  app.use('/web/api', router)
}