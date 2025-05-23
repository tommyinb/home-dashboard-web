self.addEventListener("push", (event) => {
  if (event.data) {
    let message = event.data.json();
    event.waitUntil(
      self.registration.showNotification(message.title, {
        body: message.body,
        icon: message.icon,
        actions: message.actions,
      })
    );
  }
});
