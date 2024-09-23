import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const notifications = [
  {
    id: '1',
    title: 'Bước 1 Xác định nhu cầu khách hàng',
    description: 'Vũ Văn Hoàng sắp đến hạn lúc 01/08/2020 9:00',
    date: '20/08/2020, 06:00',
    icon: 'check-circle',
    color: '#4CAF50',
  },
  {
    id: '2',
    title: 'Bạn có khách hàng mới!',
    description: 'Chúc mừng bạn, bạn có khách hàng mới. Hãy mau chóng liên lạc ngay.',
    date: '20/08/2020, 06:00',
    icon: 'person-add',
    color: '#2196F3',
  },
  {
    id: '3',
    title: 'Khách hàng được chia sẻ bị trùng',
    description: 'Rất tiếc, khách hàng được chia sẻ đã tồn tại trên hệ thống. Vui lòng chia sẻ khách hàng khác.',
    date: '20/08/2020, 06:00',
    icon: 'error',
    color: '#FF9800',
  },
  {
    id: '4',
    title: 'Công việc đã hoàn thành',
    description: 'Bạn đã hoàn thành tất cả công việc trong ngày hôm nay!',
    date: '21/08/2020, 14:00',
    icon: 'done-all',
    color: '#4CAF50',
  },
  {
    id: '5',
    title: 'Công việc sắp hết hạn',
    description: 'Bạn có 5 công việc sắp đến hạn vào hôm nay.',
    date: '21/08/2020, 08:00',
    icon: 'alarm',
    color: '#FF5722',
  },
  {
    id: '6',
    title: 'Công việc bị quá hạn',
    description: 'Bạn có 3 công việc đã bị quá hạn! Hãy kiểm tra và hoàn thành ngay.',
    date: '22/08/2020, 10:00',
    icon: 'schedule',
    color: '#F44336',
  },
  {
    id: '8',
    title: 'Số dư tài khoản',
    description: 'Số dư hiện tại của bạn là: 1.000.000.000 VND',
    date: '23/08/2020, 09:30',
    icon: 'account-balance',
    color: '#4CAF50',
  },
];

const NotificationItem = ({ title, description, date, icon, color, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.notificationItem}>
    <Icon name={icon} size={40} color={color} style={styles.icon} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  </TouchableOpacity>
);

const App = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationsList, setNotificationsList] = useState(notifications);

  const handlePress = (notification) => {
    setSelectedNotification(notification);
  };

  const handleClose = () => {
    setSelectedNotification(null);
  };

  const handleDelete = (id) => {
    setNotificationsList(notificationsList.filter(notification => notification.id !== id));
    handleClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông Báo</Text>
      <FlatList
        data={notificationsList}
        renderItem={({ item }) => (
          <NotificationItem
            title={item.title}
            description={item.description}
            date={item.date}
            icon={item.icon}
            color={item.color}
            onPress={() => handlePress(item)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
      
      <Modal
        visible={!!selectedNotification}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              {selectedNotification && (
                <>
                  <Icon name={selectedNotification.icon} size={80} color={selectedNotification.color} style={styles.modalIcon} />
                  <Text style={styles.modalTitle}>{selectedNotification.title}</Text>
                  <Text style={styles.modalDescription}>{selectedNotification.description}</Text>
                  <Text style={styles.modalDate}>{selectedNotification.date}</Text>
                  <View style={styles.buttonContainer}>
                    <Button 
                      title="Xóa Thông Báo" 
                      color="#FF5722" 
                      onPress={() => handleDelete(selectedNotification.id)} 
                    />
                    <Button 
                      title="Xem Chi Tiết" 
                      onPress={() => {
                        // Logic để xem chi tiết có thể ở đây
                        alert('Xem chi tiết thông báo: ' + selectedNotification.title);
                      }} 
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontWeight: 'bold',
    fontSize: width * 0.05,
    marginBottom: width * 0.02,
    textAlign: 'center',
    paddingVertical: width * 0.03,
    backgroundColor: '#f1f1f1',
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: width * 0.05,
    paddingHorizontal: width * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    marginRight: width * 0.03,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  description: {
    fontSize: width * 0.035,
    color: '#555',
  },
  date: {
    fontSize: width * 0.03,
    color: '#999',
  },
  listContent: {
    paddingBottom: width * 0.1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 10,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: width * 0.05,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: width * 0.04,
    marginBottom: 10,
  },
  modalDate: {
    fontSize: width * 0.03,
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
});

export default App;
