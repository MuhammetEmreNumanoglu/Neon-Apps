export interface OnboardingData {
    name: string;
    surname: string;
    zodiac: string;
    department: string;
    role: string;
}

export function convertToCSV(data: OnboardingData): string {
    const timestamp = new Date().toISOString();

    const rows = [
        ['Field', 'Value'],
        ['Name', data.name],
        ['Surname', data.surname],
        ['Zodiac', data.zodiac],
        ['Department', data.department],
        ['Role', data.role],
        ['Timestamp', timestamp]
    ];

    return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
}

export function downloadCSV(data: OnboardingData, filename?: string): void {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `onboarding-${data.name}-${Date.now()}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
