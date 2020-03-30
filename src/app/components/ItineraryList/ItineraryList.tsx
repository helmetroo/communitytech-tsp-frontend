import React, { PureComponent, FormEvent, ChangeEvent } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import ItineraryListProps from "./ItineraryList.props";
import ItineraryListState from "./ItineraryList.state";

class ItineraryList extends PureComponent<ItineraryListProps, ItineraryListState> {
    constructor(props: ItineraryListProps) {
        super(props);

        this.state = {
            checked: []
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
                this.props.order.map((orderIndex, iterationIndex) => {
                    const address = this.props.addresses[orderIndex];
                    const labelId = `checkbox-list-label-${iterationIndex}`;

                    return (
                        <ListItem
                            key={address}
                            role={undefined}
                            dense
                            button
                            onClick={this.handleToggle(iterationIndex)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={this.state.checked.indexOf(iterationIndex) !== -1}
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
