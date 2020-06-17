// 页面底部的三个按钮初始化和切换
var paging = {
  init: function () {
    this.$tabs = $('footer>div');
    this.$panels = $('main>section')
    this.bind();
  },
  bind: function(){
    var _this = this;
    this.$tabs.on('click',function(){
      console.log('click..')
      var index = $(this).index();
      _this.$panels.hide().eq(index).fadeIn();
      _this.$tabs.removeClass().eq(index).addClass('active');
    })
  }
}



// 前端项目排行
var repoBoard = {
  init:function(){
    this.$element = $('main> #repo-board');
    this.page = 1;
    this.count = 30;
    this.isFinish = false;
    this.isLoading = false;
    this.bind();
    this.getData();

  },
  bind:function(){
    var _this = this;
    this.$element.scroll(function(){
      console.log('scro;;')
      if(_this.isToBottom){
        _this.getData();
      }

    })
  },
  getData: function(callback){
    if(this.isLoading)return;
    this.isLoading = true;
    this.$element.find('.fa-redo').show();
    var _this = this;
    $.ajax({
      url: 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc',
      data: {
        page: this.page
      },
      dataType: 'jsonp'
    }).done(function(ret){
      _this.$element.find('.fa-redo').hide()
      if(_this.page*_this.count <= ret.data.total_count){
        _this.isFinish = true;
      }
      _this.setData(ret)
    }).fail(function(){
      console.log('error')
    }).always(function(){
      _this.isLoading = false;
      _this.$element.find('.fa-redo').hide();
    })
  },
  setData: function(ret) {
    var data = ret.data;
    this.render(data);

  },
  render:function (data) {
    this.page++;
    var _this= this;
    console.log(data);
    data.items.forEach(function (items,index) {
      var tpl = `<div class="item">
                <a href="https://github.com/TryGhost/Ghost">
                    <div class="order">1</div>
                    <div class="detail">
                        <h2 class="title">react</h2>
                        <div class="intro">Knockout makes it easier to create rich, responsive UIs with JavaScript</div>
                        <div class="star"><span class="star-number">122121</span><span>star</span></div>
                    </div>
                </a>
            </div>`;
      var $node = $(tpl);
      $node.find('a').attr('href',items.html_url );
      $node.find('.order').text(index + 1 + (_this.page - 2)*_this.count);
      $node.find('.title').text(items.name);
      $node.find('.intro').text(items.description);
      $node.find('.star-number').text(items.stargazers_count);
      $('#repo-board').find('.container').append($node);
    })
  },
  isToBottom:function () {
    return this.$element.find('.container').height() < this.$element.height() + this.$element.scrollTop() +20
  }
}
// 前端用户人气排行
var userBoard = {
  init:function(){
    this.$element = $('main> #user-board');
    this.page = 1;
    this.count = 30;
    this.isLoading = false;
    this.isFinish = false;
    this.getData();
    this.bind();
  },
  bind:function(){
    var _this = this;
    this.$element.scroll(function(){
      console.log('scro;;')
      if(_this.isToBottom){
        _this.getData();
      }

    })
  },
  getData: function(callback){
    var _this = this;
    if(this.isLoading)return;
    this.isLoading = true;
    this.$element.find('.fa-redo').show();
    $.ajax({
      url: 'https://api.github.com/search/users?q=followers:>1000+location:china+language:javascript',
      data: {
        page: this.page
      },
      dataType: 'jsonp'
    }).done(function(ret){
      _this.setData(ret)
    }).fail(function(){
      console.log('error')
    }).always(function(){
      _this.isLoading = false;
      _this.$element.find('.fa-redo').hide();
    })
  },
  setData: function(ret) {
    var data = ret.data;
    console.log('setdata',ret)
    this.render(data);

  },
  render:function (data) {
    this.page++;
    var _this= this;
    console.log('render',data);
    data.items.forEach(function (items,index) {
      var tpl = `<div class="item">
                        <a href="">
                            <div class="order">1</div>
                            <div class="detail">
                                <div class="avatar">
                                    <img src="" alt="">
                                </div>
                                <div class="user-detail">
                                    <div class="username">ruanyf</div>
                                    <div class="followers">121313</div>
                                </div>
                            </div>
                        </a>
                      </div>`;
      var $node = $(tpl);
      $node.find('a').attr('href',items.html_url );
      $node.find('.order').text((index+1)+(_this.page - 2)*_this.count);
      $node.find('.avatar img').attr('src',items.avatar_url);
      $node.find('.username').text(items.login);
      $('#user-board').find('.container').append($node);
    })

  },
  isToBottom:function () {
    return this.$element.find('.container').height() < this.$element.height() + this.$element.scrollTop() +20
  }
}
// 前端项目搜索
var search = {
  init:function(){
    this.$element = $('main> #search');
    this.$button = $('#search button')
    this.page = 1;
    this.count = 30;
    this.isFinish = false;
    this.isLoading = false;
    this.bind();

  },
  bind:function(){
    var _this = this;
    this.$button.click(function(){
      _this.getData();
      if(_this.isToBottom){

      }

    })
  },
  getData: function(callback){
    if(this.isLoading)return;
    this.isLoading = true;
    this.$element.find('.fa-redo').show();
    var keyword = this.$element.find('input').val();
    var _this = this;
    $.ajax({
      url: `https://api.github.com/search/repositories?q=${keyword}+language:javascript&sort=stars&order=desc&page=${_this.page}`,
      dataType: 'jsonp'
    }).done(function(ret){
      _this.$element.find('.fa-redo').hide()
      if(_this.page*_this.count <= ret.data.total_count){
        _this.isFinish = true;
      }
      _this.setData(ret)
    }).fail(function(){
      console.log('error')
    }).always(function(){
      _this.isLoading = false;
      _this.$element.find('.fa-redo').hide();
    })
  },
  setData: function(ret) {
    var data = ret.data;
    this.render(data);

  },
  render:function (data) {
    this.page++;
    var _this= this;
    console.log(data);
    data.items.forEach(function (items,index) {
      var tpl = `<div class="item">
                <a href="https://github.com/TryGhost/Ghost">
                    <div class="order">1</div>
                    <div class="detail">
                        <h2 class="title">react</h2>
                        <div class="intro">Knockout makes it easier to create rich, responsive UIs with JavaScript</div>
                        <div class="star"><span class="star-number">122121</span><span> star</span></div>
                    </div>
                </a>
            </div>`;
      var $node = $(tpl);
      $node.find('a').attr('href',items.html_url );
      $node.find('.order').text(index + 1 + (_this.page - 2)*_this.count);
      $node.find('.title').text(items.name);
      $node.find('.intro').text(items.description);
      $node.find('.star-number').text(items.stargazers_count);
      if($('#search').find('.search-result .item') >=1){
        $('#search').find('.search-result .item').remove();
        $('#search').find('.search-result').append($node);
      }
      $('#search').find('.search-result').append($node);

    })
  },
  isToBottom:function () {
    return this.$element.find('.search-result').height() < this.$element.height() + this.$element.scrollTop() +20
  }
}

// 项目主入口
var app = {
  init:function(){
    paging.init();
    repoBoard.init();
    userBoard.init();
    search.init();
  }

}

app.init()