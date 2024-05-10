async function getItems(url) {
  try {
    const data = await fetch(url);
    const items = await data.json();
    return items;
  } catch (error) {
    console.log(`error: ${error}`);
  }
}
async function getItemById(url, id) {
  try {
    const data = await fetch(`${url}/${id}`);
    const item = await data.json();
    return item;
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

async function deleteItemById(url, id) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    return res.status;
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

async function addItem(url, newItem) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...newItem,
      }),
    });
    const addedItem = await res.json();
    return addedItem;
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

async function editItem(url, id, editItem) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...editItem,
      }),
    });
    const editedItem = await res.json();
    return editedItem;
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

async function changeTasksStatus(url, oldIdStatus, newIdStatus) {
  try {
    const res = await fetch(`${url}/${oldIdStatus}/${newIdStatus}`);
    const tasksUpdated = await res.json();
    return tasksUpdated;
  } catch (error) {
    console.log(`error: ${error}`);
  }
}
export {
  getItems,
  getItemById,
  deleteItemById,
  addItem,
  editItem,
  changeTasksStatus,
};
