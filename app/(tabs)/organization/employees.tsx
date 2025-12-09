import { CreateEmployeeSheet } from "@/features/organization/ui/employees/create-employee";
import EmployeesCard, {
  Employee,
} from "@/features/organization/ui/employees/employees-card";
import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function EmployeesScreen() {
  const theme = useThemeColors();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "dasdasdasd",
      login: "admindasd",
      phone: "+998901234567",
      permissions: {
        can_send_command: false,
        can_add_employee: false,
        can_add_meter: false,
        can_add_consumer: false,
      },
    },
    {
      id: "2",
      name: "Sardor Salimov",
      login: "sardor_s",
      phone: "+998998887766",
      permissions: {
        can_send_command: true,
        can_add_employee: true,
        can_add_meter: true,
        can_add_consumer: true,
      },
    },
  ]);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreate = () => {
    setSelectedEmployee(null);
    bottomSheetRef.current?.present();
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    bottomSheetRef.current?.present();
  };

  const handleDelete = (id: string) => {
    // Just for demo, remove from local state
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSheetSubmit = (data: any) => {
    // Log data as requested
    console.log("SHEET SUBMITTED:", data);

    if (selectedEmployee) {
      // Edit Mode: Update local list
      setEmployees((prev) =>
        prev.map((e) => (e.id === selectedEmployee.id ? { ...e, ...data } : e))
      );
    } else {
      // Create Mode: Add to local list
      const newEmployee: Employee = {
        id: Math.random().toString(),
        ...data,
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }

    bottomSheetRef.current?.dismiss();
  };

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.login.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
          <Feather name="search" size={20} color={theme.muted} />
          <TextInput
            placeholder="Qidirish..."
            placeholderTextColor={theme.muted}
            style={[styles.searchInput, { color: theme.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Pressable
          style={[styles.createBtn, { backgroundColor: Colors.primary }]}
          onPress={handleCreate}
        >
          <Feather name="plus" size={20} color="white" />
          <Text style={styles.createBtnText}>Yangi xodim</Text>
        </Pressable>
      </View>

      {/* Content */}
      <FlatList
        data={loading ? [1, 2, 3] : filteredEmployees} // Skeleton placeholders
        keyExtractor={(item: any) => (loading ? item.toString() : item.id)}
        renderItem={({ item }) => (
          <EmployeesCard
            employee={item as Employee}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={loading}
          />
        )}
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
        onSubmit={handleSheetSubmit}
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
