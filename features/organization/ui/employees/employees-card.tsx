import { Colors } from "@/shared/constants/theme";
import { useThemeColors } from "@/shared/hooks/use-theme";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Employee } from "../../model/employees/types";

interface Props {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete?: (id: number | string) => void;
  isLoading?: boolean;
}

export default function EmployeesCard({
  employee,
  onEdit,
  onDelete,
  isLoading,
}: Props) {
  const theme = useThemeColors();

  if (isLoading) {
    return <CardSkeleton theme={theme} />;
  }

  const renderPermissionChip = (label: string, hasPermission: boolean) => {
    // Image shows distinct green/check items. Usually "permissions" list shows what they CAN do.
    // If they can't, maybe don't show or show gray? User said "ruxsatlar" (permissions), usually implies active ones.
    // Let's show only active ones for "chips" style to be cleaner, similar to "Activ" tags usually.
    // Actually the image shows "Access to valve", "Change meter info", etc with green ticks.
    // It implies these are the enabled permissions.

    return (
      <View style={[styles.permissionChip, { backgroundColor: theme.surface }]}>
        {hasPermission ? (
          <Ionicons name="checkmark" size={16} color="#22c55e" />
        ) : (
          <Ionicons name="close" size={16} color="#ef4444" />
        )}
        <Text style={[styles.chipText, { color: theme.text }]}>{label}</Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, shadowColor: theme.shadow },
      ]}
    >
      <View style={styles.topRow}>
        <View>
          <Text style={[styles.role, { color: theme.muted }]}>Hodim</Text>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
            {employee.name}
          </Text>
        </View>
        <View style={styles.actions}>
          <Pressable
            onPress={() => onEdit(employee)}
            style={[styles.actionBtn, { backgroundColor: theme.surface }]}
          >
            <Feather name="edit-2" size={18} color={Colors.primary} />
          </Pressable>
          {onDelete && (
            <Pressable
              onPress={() => onDelete(employee.id)}
              style={[styles.actionBtn, { backgroundColor: "#fee2e2" }]}
            >
              <Feather name="trash-2" size={18} color="#ef4444" />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.infoText, { color: theme.text }]}>
          Login: {employee.login}
        </Text>
        <View
          style={[styles.verticalDivider, { backgroundColor: theme.border }]}
        />
        <View style={styles.phoneContainer}>
          <MaterialCommunityIcons
            name="phone"
            size={16}
            color={theme.muted}
            style={{ marginTop: 2 }}
          />
          <Text style={[styles.infoText, { color: theme.text }]}>
            {employee.phone}
          </Text>
        </View>
      </View>

      <View style={styles.permissionsContainer}>
        {renderPermissionChip(
          "Kamanda yuborish",
          employee.permissions.can_send_command
        )}
        {renderPermissionChip(
          "Hodim qo'shish",
          employee.permissions.can_add_employee
        )}
        {renderPermissionChip(
          "Hisoblagich qo'shish",
          employee.permissions.can_add_meter
        )}
        {renderPermissionChip(
          "Iste'molchi qo'shish",
          employee.permissions.can_add_consumer
        )}
      </View>
    </View>
  );
}

const CardSkeleton = ({ theme }: { theme: any }) => (
  <View style={[styles.card, { backgroundColor: theme.card, opacity: 0.7 }]}>
    <View
      style={{
        width: 60,
        height: 14,
        backgroundColor: theme.border,
        borderRadius: 4,
        marginBottom: 8,
      }}
    />
    <View
      style={{
        width: 150,
        height: 24,
        backgroundColor: theme.border,
        borderRadius: 6,
        marginBottom: 12,
      }}
    />
    <View
      style={{
        width: "80%",
        height: 16,
        backgroundColor: theme.border,
        borderRadius: 4,
        marginBottom: 16,
      }}
    />
    <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
      <View
        style={{
          width: 120,
          height: 32,
          backgroundColor: theme.border,
          borderRadius: 16,
        }}
      />
      <View
        style={{
          width: 100,
          height: 32,
          backgroundColor: theme.border,
          borderRadius: 16,
        }}
      />
      <View
        style={{
          width: 140,
          height: 32,
          backgroundColor: theme.border,
          borderRadius: 16,
        }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  role: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#4b5563", // specific gray logic handled by theme override if needed, but keeping theme.text usually safe
  },
  verticalDivider: {
    width: 1,
    height: 14,
    marginHorizontal: 12,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  permissionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  permissionChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
