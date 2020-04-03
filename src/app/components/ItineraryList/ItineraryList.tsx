import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";

import { COLORS } from "../../../theme";

import ItineraryListProps from "./ItineraryList.props";
import ItineraryListState from "./ItineraryList.state";

class ItineraryList extends PureComponent<ItineraryListProps, ItineraryListState> {
    constructor(props: ItineraryListProps) {
        super(props);

        this.state = {
            checked: []
        };
    }

    protected createAddressCheckbox() {
        return withStyles({
            root: {
                color: COLORS.purple,
                '&$checked': {
                    color: COLORS.purple,
                },
                "& svg": {
                    width: "1.33em",
                    height: "1.33em",
                }
            },
            checked: {},
        })((props: CheckboxProps) => <Checkbox color="default" {...props} />);
    }

    protected handleToggle(index: number) {
        return () => {
            const currentIndex = this.state.checked.indexOf(index);
            const newChecked = [...this.state.checked];

            if(currentIndex === -1) {
                newChecked.push(index);
            } else {
                newChecked.splice(currentIndex, 1);
            }

            this.setState({
                checked: newChecked
            });
        };
    }

    render() {
        return (
            <Paper>
                <List>
                    {
                        this.props.order.map((orderIndex, iterationIndex) => {
                            const address = this.props.addresses[orderIndex];
                            const labelId = `checkbox-list-label-${iterationIndex}`;
                            const AddressCheckbox = this.createAddressCheckbox();
                            const backgroundColor = (iterationIndex % 2 === 0)
                                                  ? COLORS.pureWhite
                                                  : COLORS.white;

                            return (
                                <ListItem
                                    key={address}
                                    role={undefined}
                                    dense
                                    button
                                    style={{
                                        backgroundColor
                                    }}
                                    onClick={this.handleToggle(iterationIndex)}
                                >
                                    <ListItemIcon>
                                        <AddressCheckbox
                                            edge="start"
                                            checked={this.state.checked.includes(iterationIndex)}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ "aria-labelledby": labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        id={labelId}
                                        children={
                                            <address style={{
                                                fontStyle: "normal"
                                            }}>{address}</address>
                                        }
                                    />
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Paper>
        );
    }
}

export default ItineraryList;
