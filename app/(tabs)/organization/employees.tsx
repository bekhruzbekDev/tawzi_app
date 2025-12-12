import { Employee } from "@/features/organization/model/employees/types";
import { useEmployeeActions } from "@/features/organization/model/employees/use-employee-actions";
import { CreateEmployeeSheet } from "@/features/organization/ui/employees/create-employee";
import EmployeesCard from "@/features/organization/ui/employees/employees-card";
import { useThemeColors } from "@/shared/hooks/use-theme";
import DeleteModal from "@/shared/ui/delete-modal";
import { SearchBarHeader } from "@/widgets/search-bar-header/ui/search-bar-header";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function EmployeesScreen() {
  const theme = useThemeColors();
  const {
    data,
    loading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    searchQuery,
    setSearchQuery,
    handleCreate,
    handleEdit,
    bottomSheetRef,
    selectedEmployee,
    deleteModalVisible,
    setDeleteModalVisible,
    handleDelete,
  } = useEmployeeActions();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SearchBarHeader
        value={searchQuery}
        onChange={setSearchQuery}
        isCreteBtn={true}
        onFilterPress={handleCreate}
      />

      <FlatList
        data={loading ? [1, 2, 3] : data}
        keyExtractor={(item: any) => (loading ? item.toString() : item.id)}
        renderItem={({ item }) => (
          <EmployeesCard
            employee={item as Employee}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={loading}
          />
        )}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={{ padding: 10 }}>
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading ? (
            <Text
              style={{ textAlign: "center", color: theme.muted, marginTop: 20 }}
            >
              Xodimlar topilmadi
            </Text>
          ) : null
        }
      />

      <CreateEmployeeSheet
        ref={bottomSheetRef}
        initialValues={selectedEmployee}
      />
      <DeleteModal
        visible={deleteModalVisible}
        onchange={setDeleteModalVisible}
        queryKey="get-employees"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  createBtn: {
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  createBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
});
