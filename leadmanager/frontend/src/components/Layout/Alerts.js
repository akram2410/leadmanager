import React, { useEffect } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

const Alerts = ({ alert, error, message }) => {
  useEffect(() => {
    if (error) {
      if (error.msg.name) {
        alert.error(`Name:${error.msg.name.join()}`);
      }
      if (error.msg.email) {
        alert.error(`Email: ${error.msg.email.join()}`);
      }
      if (error.msg.message) {
        alert.error(`Message: ${error.msg.message.join()}`);
      }
      if (error.msg.non_field_errors) {
        alert.error(`Message: ${error.msg.non_field_errors.join()}`);
      }
      if (error.msg.username) {
        alert.error(error.msg.message.join());
      }
    }
    if (message) {
      if (message.deleteLead) alert.success(message.deleteLead);
      if (message.addLead) alert.success(message.addLead);
      if (message.passwordDonotMatch) alert.error(message.passwordDonotMatch);
    }
  }, [error, message]);
  return <></>;
};

export const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
