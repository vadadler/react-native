 'use strict';

 import React, {Component} from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   TextInput,
   View,
   ListView
 } from 'react-native';

 class CustomSortedListview extends Component {

   constructor(props) {
     super(props);
     let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
       text:'',
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       })
     };
   }

   componentDidMount() {
     this.setState({
       dataSource: this.state.dataSource.cloneWithRows([''])
     })
   }

   changeText = (text) => {
     let items = [];
     let tmp = [];
     let tmp2 = [];

     // Split input string of numbers into array of numbers.
     // 32154 -> [3,2,1,5,4]
     tmp  = text.split('');

     // Sort array of numbers.
     //[3,2,1,5,4] -> [1,2,3,4,5]
     tmp2 = this.mergeSort(tmp);

     // Rearrange sorted array of numbers.
     // [1,2,3,4,5] -> [1,3,2,4,5]
     items = this.customRearrange(tmp2);

     // Force ListView refresh.
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(items)
       });
   };

   // Custom list rearrange. In this implementation
   // array parameter is sorted.
   // Samples: 1234->1324, 12345->13245, 123456->132465
   customRearrange(arr) {
     if (arr.length < 3) return arr;

     let i = 0;
     let length = arr.length;

     while(i < length - 1) {
       if(i + 2 <= length - 1) {
         let tmp = arr[i+1];
         arr[i+1] = arr[i+2];
         arr[i+2] = tmp;
         i += 3;
       }
       else {
         break;
       }
     }

     return arr;
   }

   // Merge sort algorithm achives time complexity of O(Nlog(N))
   // and space complexity O(N).
   mergeSort(arr) {
     if (arr.length < 2) return arr;

     var mid = Math.floor(arr.length /2);
     var subLeft = this.mergeSort(arr.slice(0,mid));
     var subRight = this.mergeSort(arr.slice(mid));

     return this.merge(subLeft, subRight);
   };

   merge(a,b) {
     var result = [];
     while (a.length >0 && b.length >0)
         result.push(a[0] < b[0]? a.shift() : b.shift());
     return result.concat(a.length? a : b);
   };

   render() {
     return (
       <View style={styles.container}>
         <Text>Enter number</Text>
         <TextInput
           keyboardType='numeric'
           onChangeText={(t)=>this.changeText(t)}/>
           <ListView
             dataSource={this.state.dataSource}
             renderRow={(rowData) => <Text>{rowData}</Text>}/>
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     margin: 10
   }
 });

 AppRegistry.registerComponent('CustomSortedListview', () => CustomSortedListview);
