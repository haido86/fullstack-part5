const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      className="error"
      // style={
      //   message.includes("remove") ||
      //   message.includes("failed") ||
      //   message.includes("replace")
      //     ? { color: "red" }
      //     : {}
      // }
    >
      {message}
    </div>
  );
};

export default Notification;
