/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useTheme } from "@rneui/themed";
import React from "react";
import { View, ViewProps } from "react-native";

const ViewMode: React.FC<ViewProps> = (props) => {
    const { theme } = useTheme();

    const style = React.useMemo(() => {
        const clone = Object.assign({}, props.style);
        clone.backgroundColor = theme.colors.background;
        return clone;
    }, [theme, props.style]);

    return (
        <View {...props} style={style}>
            {props.children}
        </View>
    );
};

export default ViewMode;
