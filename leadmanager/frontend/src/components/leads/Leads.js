import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLeads, deleteLead } from "../../action/leads";

const Leads = ({ getLeads, leads, deleteLead }) => {
  useEffect(() => {
    getLeads();
  }, []);

  //   propTypes = {
  //     leads: PropTypes.array.isRequired
  //   };

  return (
    <Fragment>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.message}</td>
              <td>
                <button
                  onClick={() => deleteLead(lead.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  leads: state.leads.leads
});
export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
