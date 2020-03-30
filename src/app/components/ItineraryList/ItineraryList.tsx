import React, { PureComponent, FormEvent, ChangeEvent } from "react";
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import AddressField from "../AddressField";
import ItineraryListProps from "./ItineraryList.props";
import ItineraryListState from "./ItineraryList.state";

class ItineraryList extends PureComponent<ItineraryListProps, ItineraryListState> {
    constructor(props: ItineraryListProps) {
        super(props);

        this.state = {
            checked: [0]
        };
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
            <List>
            {
                this.props.addresses.map((address, index) => {
                    const labelId = `checkbox-list-label-${index}`;

                    return (
                        <ListItem
                            key={address}
                            role={undefined}
                            dense
                            button
                            onClick={this.handleToggle(index)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={this.state.checked.indexOf(index) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={address} />
                        </ListItem>
                    );
                })
            }
            </List>
        );
    }
}

export default ItineraryList;
