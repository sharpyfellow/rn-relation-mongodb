import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const BookScreen = ({ route }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { userId } = route.params;

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://192.168.3.161:3000/posts/user/${userId}`
      );
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  const renderPost = ({ item }) => {
    const formattedDate = moment(item.createdAt).format("DD:MM:YYYY");
    return (
      <View>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postItem}>{item.description}</Text>
        <Text style={styles.postDate}>Posted on: {formattedDate}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>BookScreen</Text>
      <FlatList
        style={styles.postList}
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 16,
  },
  postList: {
    marginTop: 20,
    width: "100%",
  },
  postItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postDate: {
    marginTop: 8,
    color: "gray",
  },
});

export default BookScreen;
