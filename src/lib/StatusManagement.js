class StatusManagement {
  constructor() {
    this.statuses = [];
  }
  addStatus(task) {
    this.statuses.push(this._format(task));
  }
  getStatuses() {
    return this.statuses;
  }
  findStatus(id) {
    return this.statuses.find((task) => +task.id === +id);
  }
  findStatusIndex(id) {
    return this.statuses.findIndex((task) => +task.id === +id);
  }
  updateStatus(id, newStatus) {
    const taskIndex = this.findStatusIndex(id);
    this.statuses[taskIndex] = this._format(newStatus);
  }
  deleteStatus(id) {
    const taskIndex = this.findStatusIndex(id);
    this.statuses.splice(taskIndex, 1);
  }

  _format(task) {
    return {
      id: task.id,
      title: task.title,
      assignees: task.assignees,
      status: task.status
        .toLowerCase()
        .replace("_", " ")
        .split(" ")
        .map((word = "") => word[0].toUpperCase() + word.slice(1, word.length))
        .join(" "),
    };
  }
}

export default new StatusMannagement();
