import { ref, reactive } from "vue";

class Status {
  constructor(type = null, message = null) {
    this.statusState = reactive({ type, message });
  }
  setStatus(type, message) {
    this.statusState.type = type;
    this.statusState.message = message;
  }
  clear() {
    setStatus(null, null);
  }
}

export default new Status();
