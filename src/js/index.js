/**
 * Created by Moudi on 2017/2/25.
 */

//载入css
require('../css/main.scss');
let data = require('./data.js');

class Pieces {
  constructor(id) {
    this.$e = $('#' + id);
    this.nameArr = data.animalList;
    this.n = 0;
    this.$startBtn = $('#start');
    this.timer = null;
    this.init();
  }

  init() {
    this._resize();
    this._initEvent();
    this._initData();
    window.onload = () => {
      this._preloaderSeq();
    }
  }

  _initEvent() {
    window.onresize = this._resize.bind(this);
    this._setStateX();
    this._setState_X();
    this._setShimmer();
    this.$startBtn.click(() => {
      $('.intro-content').fadeOut(300, () => {
        $(document.body).removeClass('show-title');
      });
      $(document.body).removeClass('title');
      $(document.body).addClass(this.nameArr[this.n]);
      $('#animal-name').text(data.translatedAnimalNames[this.n]);
      $('.prev .popout').text(data.translatedAnimalNames[this.nameArr.length - 1]);
      $('.next .popout').text(data.translatedAnimalNames[this.n + 1]);
      setTimeout(() => {
        $(document.body).removeClass('preloader-layer');
        $(document.body).addClass('animation-lock');
      }, 1800);
      $('.next').on('click', () => {
        this.next();
      });
      $('.prev').on('click', () => {
        this.prev();
      });
    });
    $('.help').click(() => {
      $(document.body).removeClass('animation-lock');
      this.$e.addClass('no-delay');
      $('#scientific-name').text(data.animalScientificName[this.n]);
      $('#range').text(data.translatedAnimalRange[this.n]);
      $('.why-info').eq(0).html(data.translatedAnimalCopyOne[this.n]);
      $('.why-info').eq(1).html(data.animalCopyTwo[this.n]);
      $('.why-info').eq(2).html(data.animalCopyThree[this.n]);
      $(document.body).addClass('smash');
      setTimeout(() => {
        $('.content-wrapper').addClass('show');
      }, 1000);
    });
    $('.direct-stats').click(() => {
      $(document.body).removeClass('animation-lock');
      this.$e.addClass('no-delay');
      $('#scientific-name').text(data.animalScientificName[this.n]);
      $('#range').text(data.translatedAnimalRange[this.n]);
      $('.why-info').eq(0).html(data.translatedAnimalCopyOne[this.n]);
      $('.why-info').eq(1).html(data.animalCopyTwo[this.n]);
      $('.why-info').eq(2).html(data.animalCopyThree[this.n]);
      $(document.body).addClass('smash');
      setTimeout(() => {
        $('.content-wrapper').addClass('show');
      }, 1000);
    });
    $('.content-info .close').click(() => {
      this.$e.removeClass('no-delay');
      setTimeout(() => {
        $('.content-wrapper').removeClass('show');
        $(document.body).removeClass('smash');
        setTimeout(() => {
          $(document.body).addClass('animation-lock');
        }, 1700)
      }, 100);
    });
    $('.main-nav .nav-btn').eq(2).click(() => {
      if (!!$('#audio')[0].muted) {
        $('#audio')[0].muted = false;
        $('.main-nav .nav-btn').eq(2).parent().removeClass('muted');
      } else {
        $('#audio')[0].muted = true;
        $('.main-nav .nav-btn').eq(2).parent().addClass('muted');
      }
    });
    $('.main-nav .nav-btn').eq(1).click(() => {
      if (this.timer) {
        $('.main-nav .nav-btn').eq(1).removeClass('stop');
        this.autoPlay(false);
      } else {
        $('.main-nav .nav-btn').eq(1).addClass('stop');
        this.autoPlay(true);
      }
    });
    this._linkEvent();
    this._allAnimalEvent();
  }

  _allAnimalEvent() {
    // 所有动物按钮点击事件
    $('#all-animals-btn').click(() => {
      $(document.body).removeClass('animation-lock');
      $(document.body).addClass('all-animals');
      $('.hover-detector').removeClass('inactive').find('div').removeClass('active-animal').eq(this.n).addClass('active-animal');
      $('.animal-nav-content').removeClass('inactive');
      setTimeout(() => {
        $('.hover-detector').addClass('active');
        $('.animal-nav-content').addClass('active');
      }, 1200);
      $('.main-nav > .close').addClass('active');
    });
    // 所有动物关闭按钮
    $('.main-nav > .close').click(() => {
      $('.hover-detector').removeClass('active').addClass('inactive');
      $('.animal-nav-content').removeClass('active').addClass('inactive');
      $('.main-nav > .close').removeClass('active');
      $(document.body).removeClass('all-animals');
      setTimeout(() => {
        $(document.body).addClass('animation-lock');
      }, 1500)
    });
    // 随机
    $('.random-animal-btn').click(() => {
      $('.hover-detector').removeClass('active').addClass('inactive');
      $('.animal-nav-content').removeClass('active').addClass('inactive');
      $('.main-nav > .close').removeClass('active');
      $(document.body).removeClass('all-animals');
      this.random();
    });
    // 遍历小圆点
    $('.hover-detector').find('div').each((index, ele) => {
      $(ele).hover((ev) => {
        $('.title-content').addClass('inactive');
        $('#show-stage').find('.pieces').removeClass('active').eq($(ev.target).index()).addClass('active');
        $('.all-animals-title').find('li').eq($(ev.target).index()).addClass('active');
      }, () => {
        $('.title-content').removeClass('inactive');
        $('#show-stage').find('.pieces').removeClass('active');
        $('.all-animals-title').find('li').removeClass('active');
      });
      $(ele).click((ev) => {
        $('.hover-detector').removeClass('active').addClass('inactive');
        $('.animal-nav-content').removeClass('active').addClass('inactive');
        $('.main-nav > .close').removeClass('active');
        $(document.body).removeClass('all-animals');
        this.n = $(ev.target).index();
        this.show();
      });
    });
    // 遍历列表
    $('.all-animals-title').find('li').each((index, ele) => {
      if (document.documentElement.className !== 'small-nav') return;
      $(ele).click((ev) => {
        let target = ev.target.nodeName === 'LI' ? ev.target : ev.target.parentNode;
        $('.animal-nav-content').removeClass('active').addClass('inactive');
        $('.main-nav > .close').removeClass('active');
        $(document.body).removeClass('all-animals');
        $('.hover-detector').removeClass('active').addClass('inactive');
        this.n = $(target).index();
        this.show();
      });
    });
  }

  _linkEvent() {
    $('.overlay .close').click(() => {
      $('.overlay > div').hide(0).removeClass('active');
      $('.overlay').removeClass('active');
    });
    $('.link .about').click(() => {
      $('.overlay').addClass('active');
      $('.overlay .about').show(0).addClass('active');
    });
    $('.link .how').click(() => {
      $('.overlay').addClass('active');
      $('.overlay .how').show(0).addClass('active');
    });
    $('.link .sources').click(() => {
      $('.overlay').addClass('active');
      $('.overlay .sources').show(0).addClass('active');
    });
    $('.link .share').click(() => {
      $('.overlay').addClass('active');
      $('.overlay .shring-goodies').show(0).addClass('active');
    });
    $('.animal-info .wallpaper').click(() => {
      $('.overlay').addClass('active');
      $('.overlay .download').show(0).addClass('active');
    });
    $('.footer-nav').click(() => {
      if ($('footer')[0].className === 'mobile-footer-active') {
        $('footer').removeClass('mobile-footer-active');
      } else {
        $('footer').addClass('mobile-footer-active');
      }
    });
  }

  _initData() {
    $('.all-animals-title').find('h2').each((index, ele) => {
      $(ele).text(data.translatedAnimalNames[index]);
    });
  }

  autoPlay(opt) {
    if (opt) {
      this.next();
      this.timer = setInterval(() => {
        this.next();
      }, 4500);
    } else {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  show() {
    $('.prev .popout').text(data.translatedAnimalNames[(this.n - 1) < 0 ? data.translatedAnimalNames.length - 1 : (this.n - 1)]);
    $('.next .popout').text(data.translatedAnimalNames[(this.n + 1) >= data.translatedAnimalNames.length ? 0 : (this.n + 1)]);
    $(document.body).removeClass();
    $('.animal-info').addClass('text-change');
    setTimeout(() => {
      $('.pieces-no').text(this.n + 1);
      $('#animal-name').text(data.translatedAnimalNames[this.n]);
      $('.animal-info').removeClass('text-change');
    }, 300);
    $(document.body).addClass(this.nameArr[this.n]);
    setTimeout(() => {
      $(document.body).addClass('animation-lock');
    }, 2000)
  }

  next() {
    $(document.body).removeClass('animation-lock');
    this.n++;
    this.n >= this.nameArr.length && (this.n = 0);
    this.show();
  }

  prev() {
    $(document.body).removeClass('animation-lock');
    this.n--;
    this.n < 0 && (this.n = this.nameArr.length - 1);
    this.show();
  }

  random() {
    $(document.body).removeClass('animation-lock');
    this.n = Math.floor(Math.random() * this.nameArr.length);
    this.show();
  }

  _resize() {
    let w = $(window).innerWidth() * .9;
    let h = w * (2 / 3);
    if ($(window).innerWidth() < 700) {
      $(document.documentElement).addClass('small-nav');
    } else {
      $(document.documentElement).removeClass('small-nav');
    }
    this.$e.width(w);
    this.$e.height(h);
  }

  _preloaderSeq() {
    let b = $(document.body);
    setTimeout(() => {
      b.addClass('ready').removeClass('preloader');
      $('.loading-progress').addClass('active');
      this._introSeq();
      setTimeout(() => {
        b.addClass('preAni');
        setTimeout(() => {
          b.removeClass('preAni');
          setTimeout(() => {
            b.removeClass('ready').addClass('title');
            setTimeout(() => {
              b.addClass('show-title');
            }, 2000);
          }, 2300);
        }, 10000);
      }, 4500);
    }, 3000);
  }

  _introSeq() {
    let $ps = $('.loading-intro').find('p');
    $($ps[0]).addClass('show');
    setTimeout(() => {
      $($ps[0]).removeClass('show');
      $($ps[1]).addClass('show');
      setTimeout(() => {
        $($ps[1]).removeClass('show');
        $($ps[2]).addClass('show');
        setTimeout(() => {
          $($ps[2]).removeClass('show');
          $($ps[3]).addClass('show');
          setTimeout(() => {
            $($ps[3]).removeClass('show');
          }, 4000)
        }, 4000)
      }, 4000)
    }, 4000)
  }

  _setStateX() {
    let b = $(document.body);
    setInterval(() => {
      b.removeClass("state3");
      setTimeout(() => {
        b.addClass("state1");
      }, 1000);
      setTimeout(() => {
        b.removeClass("state1").addClass("state2");
      }, 2500);
      setTimeout(() => {
        b.removeClass("state2").addClass("state3");
      }, 3500)
    }, 5000)
  }

  _setState_X() {
    setInterval(() => {
      let b = $(document.body);
      setTimeout(() => {
        b.addClass("state-1");
      }, 1000);
      setTimeout(() => {
        b.removeClass("state-1");
      }, 1500);
      setTimeout(() => {
        b.addClass("state-1");
      }, 1900);
      setTimeout(() => {
        b.removeClass("state-1");
      }, 2500);
    }, 3000)
  }

  _setShimmer() {
    let b = $(document.body);
    setInterval(() => {
      setTimeout(() => {
        b.addClass("shimmer")
      }, 2000);
      setTimeout(() => {
        b.removeClass("shimmer")
      }, 6700);
    }, 7000)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let ss = new Pieces('show-stage');
});
