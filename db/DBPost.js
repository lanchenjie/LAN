class DBPost{
  constructor(postId){
    this.storageKeyName='postList'
    this.postId=postId
  }
  //查询所有文章数据
  getAllPostData(){
    var res=wx.getStorageSync(this.storageKeyName)
    if(!res){
      res=require("../data/data.js").post_data
      wx.setStorageSync(this.storageKeyName, res)
    }
    return res
  }

  getPostItemById(){
    var allPostData=this.getAllPostData()
    var len=allPostData.length
    for(var i=0;i<len;i++){
      if(allPostData[i].postId==this.postId){
        return{
          index:i,
          data:allPostData[i]
        }
      }
    }
  }
  //查询指定id文章的评论数据
  getCommentData(){
    //获取当前文章的评论数据
    var postData=this.getPostItemById().data
    //获取当前文章的评论数据 
    var postComments=postData.comments 
   //评论数据按时间倒序排序  
    postComments.sort(function (a, b) { 
      return a.create_time < b.create_time ? 1 : -1; 
    });

    //返回评论数据
    return postComments
  }
  //点赞
  like(){
    return this.updatePostData('like')
  }

  //评论
  comment(newCommentData){
    this.newCommentData=newCommentData
    return this.updatePostData('comment')
  }

  //收藏
  collect(){
    return this.updatePostData('collect')
  }

  //增加阅读量
  read(){
    return this.updatePostData('read')
  }

  //更新数据
  updatePostData(category){
    var index=this.getPostItemById().index
    var postData=this.getPostItemById().data

    //处理事件
    switch(category){
      case 'like':
        //处理点赞
        if(postData.upStatus){
          postData.upStatus=false
          postData.upNum--
        }
        else{
          postData.upStatus=true
          postData.upNum++
        }

        break;

        case 'collect':
        //处理收藏
        if(postData.collectionStatus){
          postData.collectionStatus=false
          postData.collectionNum--
        }
        else{
          postData.collectionStatus=true
          postData.collectionNum++
        }

        break;

        case 'read':
          postData.readingNum++;
        break;
        case 'comment':
          //处理评论
          postData.comments.push(this.newCommentData)
          postData.commentNum++
        break;
    }

    //更新数据
    var allPostData=this.getAllPostData()
    allPostData[index]=postData
    wx.setStorageSync(this.storageKeyName,allPostData)

    //返回更新后的数据
    return postData
  }
}

export{
  DBPost
}