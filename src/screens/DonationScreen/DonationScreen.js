import React from 'react';
import {View} from 'react-native';
import {List, Searchbar} from 'react-native-paper';

export default function DonationScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <List.Section title="blood donation facilities.">
        <List.Accordion
          title="Aga Khan Hospital"
          description="click to explore"
          left={props => <List.Icon {...props} icon="folder" />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <List.Accordion
          title="Aga Khan Hospital"
          left={props => <List.Icon {...props} icon="folder" />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
    </View>
  );
}
