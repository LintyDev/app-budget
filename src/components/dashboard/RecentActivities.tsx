import ActivitiesServices from "@/services/activities.services";
import globalStyles from "@/styles/globalStyles";
import { Log } from "@/types/logs";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ListActivities from "./ListActivities";

function RecentActivities() {
  const {isPending, isError, data, error} = useQuery<Log[] | null>({
    queryKey: ['activities'],
    queryFn: async () => await new ActivitiesServices().getLogs()
  });
  const activities = data ? [...data].reverse() : null;

  return (
    <View style={styles.fullSpace}>
      <Text style={[globalStyles.text, styles.title]}>Activités récentes</Text>
      <View style={styles.fullSpace}>
        {isPending || isError || !activities ?
          <Text style={[globalStyles.text]}>Aucune activité</Text> :
          <ScrollView>
            {activities.map((a) => {
              return (
                <ListActivities activities={a} key={a.id}/>
              )
            })}
          </ScrollView>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28
  },
  fullSpace: {
    flex: 1
  }
});

export default RecentActivities;