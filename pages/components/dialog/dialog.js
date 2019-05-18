import Component from "../component";

export default {
  //默认数据
  data() {
    return {
      title: "正在申请微信授权",
      content: "",
      showCancel: false,
      cancelText: "取消",
      cancelType: "button",
      confirmText: "确定",
      confirmType: "button",
      confrimOpenType: "",
      success: () => {

      },
      fail: () => {

      },
      complete: () => {

      }
    }
  },

  hide(opts = {}) {

  },

  /**
   * 创建组件
   */
  open(opts = {}) {
    const options = Object.assign({
      visible: !1
    }, this.data(), opts);

    const comDig = new Component({
      scope: `myDialog`,
      data: options,
      methods: {
        //隐藏
        hide(cb) {
          this.setHidden();
          typeof cb === 'function' && cb();
        },
        //显示
        show() {
          this.setVisible();
        },
        //按钮回调
        buttonTapped(e) {
          const index = e.currentTarget.dataset.index;
          const button = options.buttons[index];
          this.hide(() => {
            if (options.buttons.length > 1) {
              if (index < 1) {
                typeof options.fail === `function` && options.fail(e, this);
              }
            } else {
              typeof options.success === `function` && options.success(e, this);
            }
          });
        },
        //用户信息回调
        openButtonTapped(e) {
          this.hide(() => {
            typeof options.success === 'function' && options.success(e, this);
            typeof options.complete === 'function' && options.complete(e, this);
          });
        }
      }
    });

    comDig.show();
  },

  /**
   * 显示弹框
   */
  showModal(opts) {
    const options = Object.assign({
      visible: !1
    }, this.data(), opts);

    let buttons = [];

    //声明取消按钮
    let cancel_btn = {
      text: options.cancelText,
      type: options.cancelType,
      onTap: (e) => {
        options.fail === 'function' && options.fail(e)
      }
    },
      //声明确定按钮
      confirm_btn = {
        text: options.confirmText,
        type: options.confirmType,
        openType: options.confirmOpenType,
        className: "modal-btn-primary",
        onTap: (e) => {
          options.success === 'function' && options.success(e);
        }
      };

    //是否显示取消按钮
    if (options.showCancel) {
      buttons[0] = cancel_btn;
      buttons[1] = confirm_btn;
    } else {
      buttons[0] = confirm_btn;
    }

    this.open(Object.assign({
      buttons
    }, options));
  }
};
