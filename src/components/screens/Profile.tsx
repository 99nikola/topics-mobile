import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import { RootStackParamList } from "../../App";

type ProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const Profile: React.FC<ProfileProps> = (props) => {
    return <Text>This is {props.route.params.userId}&apos;s profile</Text>;
};

export default Profile;
