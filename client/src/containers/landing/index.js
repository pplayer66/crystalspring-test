import React, { Fragment, Component, useLayoutEffect } from "react";
import { connect } from "react-redux";

import "./landing.css";
import usrs from "./users.json";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      roles: [
        { code: "admin", name: "администратор" },
        { code: "support", name: "поддержка" },
        { code: "user", name: "пользователь" },
        { code: "system", name: "системный" }
      ],
      users: usrs,
      togle: true
    };
    this.change = this.change.bind(this);
    this.togle = this.togle.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
  }

  togle() {
    this.setState(prevState => ({
      togle: !prevState.togle
    }));
  }

  change() {
    this.setState(prevState => ({
      change: !prevState.change
    }));
  }

  add(user, item) {
    this.setState({
      users: this.state.users.map(usr => {
        return usr.id == user.id ? { ...user, roles: [...user.roles, item] } : usr
      })
    })
  }

  delete(user, item) {
    this.setState({
      users: this.state.users.map(usr => {
        return user.id == usr.id ? { ...usr, roles: usr.roles.filter(role => role.code !== item.code) } : usr
      })
    })
  }

  render() {
    return (
      <Fragment>
        <div>
          <div className="tabs">
            <button className="tab" onClick={this.togle}>
              togle
            </button>
            <button className="tab" onClick={this.change}>
              change
            </button>
          </div>
          <div className="items">
            {this.state.togle
              ? this.state.users.map((user, k) => {
                return (
                  <div key={k} className="item">
                    <div className="item-title">{user.name}</div>
                    <div className="item-id">id : {user.id}</div>
                    <div className="item-roles-title">Права :</div>
                    {this.state.change ? (
                      <div className="roles">
                        {this.state.roles.map((item, key) => {
                          return user.roles.find(i => {
                            return i.code === item.code;
                          }) === undefined ? (
                              <div key={key} className="role">
                                <input
                                  type="checkbox"
                                  className="item-checkbox"
                                  name="role"
                                  id={key}
                                  onChange={e => this.add(user, item, e)}
                                />
                                {item.name}
                              </div>
                            ) : (
                              <div key={key} className="role">
                                <input
                                  type="checkbox"
                                  className="item-checkbox"
                                  name="role"
                                  id={key}
                                  onChange={e => this.delete(user, item, e)}
                                  checked={true}
                                />
                                {item.name}
                              </div>
                            );
                        })}
                      </div>
                    ) : (
                        <div className="roles">
                          {user.roles.map((item, key) => {
                            return (
                              <div key={key} className="role">
                                {item.name}
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </div>
                );
              })
              : null}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Main);
