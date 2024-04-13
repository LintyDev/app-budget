import ActivitiesServices from "@/services/activities.services";
import globalStyles from "@/styles/globalStyles";
import { Log } from "@/types/logs";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";
import ListActivities from "./ListActivities";

function RecentActivities() {
  const {isPending, isError, data, error} = useQuery<Log[] | null>({
    queryKey: ['activities'],
    queryFn: async () => await new ActivitiesServices().getLogs()
  });
  const activities = data ? [...data].reverse() : null;

  return (
    <View>
      <Text style={[globalStyles.text, styles.title]}>Activités récentes</Text>
      {isPending || isError || !activities ?
      <Text style={[globalStyles.text]}>Aucune activité</Text> :
      activities.map((a) => {
        return (
          <ListActivities activities={a} key={a.id}/>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28
  }
});

export default RecentActivities;