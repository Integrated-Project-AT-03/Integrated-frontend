class TaskStatusManagement {
  constructor() {
    this.statuses = []
  }

  async setStatuses(statuses = []) {
    this.statuses = statuses
  }
  addStatus(status) {
    this.statuses.push(this._format(status))
  }

  getStatuses() {
    return this.statuses
  }
  findStatusIndex(id) {
    return this.statuses.findIndex((status) => +status.id === +id)
  }
  updateStatus(id, newStatus) {
    const statusIndex = this.findStatusIndex(id)
    this.statuses[statusIndex] = this._format(newStatus)
  }
  deleteStatus(id) {
    const statusIndex = this.findStatusIndex(id)
    this.statuses.splice(statusIndex, 1)
  }
  findStatus(id) {
    return this.statuses.find((status) => +status.id === +id)
  }

  _format(status) {
    return {
      id: status.id,
      title: status.title,
      assignees: status.assignees,
      status: status.status
        .toLowerCase()
        .replace("_", " ")
        .split(" ")
        .map((word = "") => word[0].toUpperCase() + word.slice(1, word.length))
        .join(" ")
    }
  }
}

export default new TaskStatusManagement()