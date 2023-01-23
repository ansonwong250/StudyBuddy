import json
import numpy
from sklearn.neighbors import KDTree
from util.database import database


class FriendsCircle:
    def __init__(self, data):
        study_string_values = {
            'university': {
                'university_of_toronto': 1,
                'university_of_western_ontario': 2,
                'york_university': 3,
                'ryerson_university': 4,
                'brock_university': 5,
                'university_of_waterloo': 6,
                'seneca_college': 7,
                'harvard_university': 8,
                'stanford_university': 9,
                'none': 10
            },
            'major': {
                'computer_science': 1,
                'math': 2,
                'physics': 3,
                'biology': 4,
                'accounting': 7,
                'economics': 8,
                'business': 9,
                'english': 10,
                'history': 12,
                'psychology': 13,
                'other': 17
            }
        }

        study_weights = {
            'university': 7,
            'gpa': 2,
            'major': 8,
            'lat': 3,
            'long': 3
        }

        study_ranges = {
            'university': (1, 2),
            'gpa': (0, 4),
            'major': (1, 10),
            'lat': (-90, 90),
            'long': (-180, 180)
        }

        study_features = [
            'university',
            'gpa',
            'major',
            'lat',
            'long'
        ]

        activity_string_values = {
        }

        activity_weights = {
        }

        activity_ranges = {
        }

        activity_features = [

        ]

        self.string_values = {
            'study': study_string_values,
            'activity': activity_string_values
        }

        self.weights = {
            'study': study_weights,
            'activity': activity_weights
        }

        self.ranges = {
            'study': study_ranges,
            'activity': activity_ranges
        }

        self.features = {
            'study': study_features,
            'activity': activity_features
        }

        self.all_intersts = ['reading', 'writing']
        self.interst_weight = 1

        self.users = []

        self.user_points = {
            'study': [],
            'activity': []
        }
        self.trees = {
            'study': [],
            'activity': []
        }

        for user in data:

            points = []

            user_type = user['type']

            self.users.append(user)

            user_points = self.user_points[user_type]
            string_values = self.string_values[user_type]
            weights = self.weights[user_type]
            ranges = self.ranges[user_type]
            features = self.features[user_type]

            for key in features:
                weight = weights[key]
                min_value = ranges[key][0]
                max_value = ranges[key][1]

                if isinstance(user[key], str):
                    value = string_values[key][user[key]]
                elif isinstance(user[key], float):
                    value = user[key]

                normalized_value = (value - min_value) / (max_value - min_value)
                points.append(normalized_value * weight)

            for interst in self.all_intersts:
                if interst in user['lookingFor']:
                    points.append(1 * self.interst_weight)
                else:
                    points.append(0)

            user_points.append(points)

        for key in self.user_points:
            self.user_points[key] = numpy.array(self.user_points[key])
            if len(self.user_points[key]): \
                    self.trees[key] = KDTree(self.user_points[key])

    def get_user(self, id):
        for i in range(len(self.users)):
            user = self.users[i]
            if user['userID'] == id:
                return i, user['type']

    def get_nearest_users(self, id, k):
        index, user_type = self.get_user(id)

        point = self.user_points[user_type][index]
        distances, indices = self.trees[user_type].query([point], k + 1)

        nearest_users_arr = []

        for i in range(1, len(indices[0])):
            index = indices[0][i]
            nearest_users_arr.append(self.users[index]['userID'])

        return nearest_users_arr


# with open('allUsers.json', 'r') as file:
#     data = json.load(file)
# friends_circle = FriendsCircle(data)
# nearest_users = friends_circle.get_nearest_users(3, 2)
# print(nearest_users)