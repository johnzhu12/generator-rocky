import { observable, action } from 'mobx'

/**
 * 公共
 */

class ObservableNoticeStore {
    @observable noticeStore = {

    }
    //获取加载状态
    @action getNotice() {
        // console.log('我是get的Notice', Notice)
        return this.noticeStore
    }
    //获取加载状态
    @action setNotice(Notice: object) {
        // console.log('我是set的Notice', Notice)
        this.noticeStore = Notice;
    }
}



const Notice = new ObservableNoticeStore();
export default Notice
