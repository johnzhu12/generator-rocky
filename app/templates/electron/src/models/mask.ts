import { observable, action } from 'mobx'

/**
 * 全局loading
 * added by john 8-9
 */

class ObservableMaskStore {
    @observable maskStore = {
        loading: false
    }
    //获取加载状态
    @action getLoadingStatus() {
        return this.maskStore.loading
    }
    //获取加载状态
    @action setLoadingStatus(status: boolean) {
        return this.maskStore.loading = status
    }
}



const mask = new ObservableMaskStore();
export default mask
