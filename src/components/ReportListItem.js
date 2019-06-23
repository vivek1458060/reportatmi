import React from 'react';
import moment from 'moment'
import numeral from 'numeral'

class ReportListItem extends React.Component {
    state = {
        open: false
    }

    openModal = () => this.setState({ open: true })
    closeModal = () => this.setState({ open: false })

    render() {
        const { id, title, description, imageUrl, cost, publishedAt } = this.props;
        return (
            <div className="list-item" style={{ cursor: 'pointer' }}>
                <div className="card" onClick={this.openModal}>
                    <img src={imageUrl} className="card-image" width="190" height="200" />
                    <ul className="card-body">
                        <li className="card-body__title">{title}</li>
                        <li className="card-body__subtitle">{description}</li>
                        <li className="card-body__createdDate">
                            Published: {moment(publishedAt).format('L')}
                        </li>
                        <li className="card-body__cost">
                            COST OF REPORT : <span>{numeral(cost).format('$0,0.00')}</span>
                        </li>
                    </ul>
                </div>
                <div className="modal" style={{ display: this.state.open ? 'block' : 'none' }}>
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>{description}</p>
                            <div onClick={this.closeModal} className="modal-body__actions">
                                <button className="button close" onClick={this.closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportListItem;