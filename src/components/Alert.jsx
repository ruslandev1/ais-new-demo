import { Alert, Text } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';

export default function AlertForError({ error}) {
    return (
        <Text truncate title="Xəta" color="red" radius="md" sx={{ marginTop: 25 }}>
            {error.summary}
        </Text>
    );
}