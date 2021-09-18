const router = require('koa-router')()
var ApiModel = require('../db/api');


router.post('/addThing', async (ctx, next) => {
  // await ctx.render('index', {
  //   title: 'Hello Koa 2!'
  // })
  // console.log('ctx.request.body :>> ', ctx.request.body);

  // var apiModel = new ApiModel(ctx.request.body)
  try {
    const save = await ApiModel.create(ctx.request.body)
    if (save) {
      // ctx.status = 200
      ctx.body = {
        data: `${save.name}，在数据库增加成功！`
      }
      // 获取表的数据
      const docs = await ApiModel.find({ name: save.name })
      console.log('最新保存的' + docs);

    }
  } catch (error) {
    console.log(error);
    ctx.body = error
  }
  // 执行新增操作

})

router.get('/findAll', async (ctx, next) => {
  const data = await ApiModel.find({})
  ctx.body = { data }
})

router.delete('/deleteOne', async (ctx, next) => {
  try {
    const data = await ApiModel.deleteOne({ id: ctx.request.body.id })
    if (data) {
      console.log(JSON.stringify(data) + '在数据库删除成功');
      // ctx.status = 200
      ctx.body = {
        data: `${data}，在数据库删除成功！`
      }
      // 获取表的数据
      const docs = await ApiModel.find({ id: ctx.request.body.id })
      console.log('删除成功，查不到' + docs);

    }
  } catch (error) {
    console.log(error);
    ctx.body = error
  }
})

router.post('/searchThing', async (ctx, next) => {
  try {
    console.log('ctx.request.body', ctx.request.body.name)
    const docs = await ApiModel.find({ name: new RegExp(ctx.request.body.name) })
    if (docs) {
      console.log('docs :>> ', docs);
      ctx.body = {
        data: docs
      }
    }
  } catch (error) {
    console.log(error);
    ctx.body = error
  }
})

router.post('/controlIsDone', async (ctx, next) => {
  try {
    console.log('ctx.request.body', ctx.request.body)
    const docs = await ApiModel.update({ id: ctx.request.body.id }, { done: ctx.request.body.done })
    if (docs) {
      console.log('docs :>> ', docs);
      ctx.body = {
        data: docs
      }
    }
  } catch (error) {
    console.log(error);
    ctx.body = error
  }
})
router.post('/selectAll', async (ctx, next) => {
  try {
    console.log('ctx.request.body', ctx.request.body)
    const resFindAll = await ApiModel.find({})
    if (resFindAll) {
      resFindAll.forEach(async (item) => {
        const docs = await ApiModel.update({ id: item.id }, { done: ctx.request.body.done })
        console.log('docs :>> ', docs);
        ctx.body = {
          data: docs
        }
      })
    }
  } catch (error) {
    console.log(error);
    ctx.body = error
  }
})
router.delete('/deleteDone', async (ctx, next) => {
  try {
    const resFindDone = await ApiModel.find({ done: true })
    // console.log('resFindDone :>> ', resFindDone);
    if (resFindDone) {
      resFindDone.forEach(async (item) => {
        const resDeleteOne = await ApiModel.deleteOne({ id: new RegExp(item.id) })
        console.log('resDeleteOne :>> ', resDeleteOne);
        ctx.body = {
          data: resDeleteOne
        }
      })
    }
  } catch (error) {
    console.log(error);
    ctx.body = error
  }
})
module.exports = router
