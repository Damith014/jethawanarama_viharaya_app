import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Client from "../../client/Client";
import { useTranslation } from "react-i18next";
import ProgramCard from "../../component/Cards/ProgramCard";
import EmptyCard from "../../component/Cards/EmptyCard";
import { Program } from "../../client/Interface";
import { RootNavigation } from "../../navigations/RootNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import "../../assest/i18n/i18n";
type calendarScreenProp = StackNavigationProp<RootNavigation, "Calendar">;
function ProgramScreen() {
  const navigation = useNavigation<calendarScreenProp>();
  const [isLoading, setIsLoading] = useState(true);
  const [programs, setPrograms] = useState<any>([]);
  const { t } = useTranslation();
  useEffect(() => {
    getProgram().catch(error => {});
    async function getProgram() {
      setIsLoading(true);
      let response = await Client.program();
      if (response.status == 200) {
        setIsLoading(false);
        setPrograms(response.programs?.programs as []);
      } else {
        setIsLoading(false);
      }
    }
  }, []);
  const Item = ({ program,index }: { program: Program, index: number }) => (
    <>
      {program != null &&
        <ProgramCard
          program={program}
          onPress={() => {
            if (program.id == 1000) {
              setTimeout(function () {
                navigation.navigate("Calendar");
              }, 1000);
            } else {
              navigation.navigate("Tab", { program_id: program.id.toString()});
            }
          }}
          isLeft={(index % 2) ? false : true}
        />
      }
    </>
  );
  const EmptyListMessage = () => {
    return (
      <View>
        {!isLoading && <EmptyCard title={t("sorry")} body={t("message")} />}
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "#000" }}
        />
        <FlatList
          style={{ marginBottom: 0 }}
          data={programs}
          keyExtractor={(item) => item?.id}
          renderItem={({ item, index }) => <Item program={item} index={index}/>}
          nestedScrollEnabled={true}
          ListEmptyComponent={EmptyListMessage}
        />
      </View>
    </SafeAreaView>
  );
}
export default ProgramScreen;