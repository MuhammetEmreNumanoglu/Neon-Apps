// Mock authentication service
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: 'Admin' | 'Employee';
  };
}

// Mock auth service with simulated delay
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation - only allow emails ending with @neonapps.com
    if (!credentials.email.endsWith('@neonapps.com')) {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }

    // Mock password validation (in real app, this would be server-side)
    // For demo purposes, accept any password that meets the client-side validation
    if (credentials.password.length < 8) {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }

    // Mock user lookup from staff data
    const staffMembers = [
      { email: 'bilal.barut@neonapps.com', name: 'Bilal Barut', role: 'Admin' as const },
      { email: 'anil.abi@neonapps.com', name: 'Anıl Abi', role: 'Admin' as const },
      { email: 'alihan.gezer@neonapps.com', name: 'Alihan Gezer', role: 'Employee' as const },
      { email: 'omer.faruk.biberoglu@neonapps.com', name: 'Ömer Faruk Biberoğlu', role: 'Employee' as const },
      { email: 'anil.sorgit@neonapps.com', name: 'Anıl Sorgit', role: 'Employee' as const },
      { email: 'veysel.ugurlu@neonapps.com', name: 'Veysel Uğurlu', role: 'Employee' as const },
      { email: 'betul.gulec@neonapps.com', name: 'Betül Güleç', role: 'Employee' as const },
      { email: 'esra.betul.ozcan@neonapps.com', name: 'Esra Betül Özcan', role: 'Employee' as const },
      { email: 'baris.ant@neonapps.com', name: 'Barış Ant', role: 'Employee' as const },
      { email: 'yusa.koc@neonapps.com', name: 'Yuşa Koç', role: 'Employee' as const },
      { email: 'irem.yasar@neonapps.com', name: 'İrem Yaşar', role: 'Employee' as const },
      { email: 'can.tasa@neonapps.com', name: 'Can Tasa', role: 'Employee' as const },
      { email: 'eren.sonmez@neonapps.com', name: 'Eren Sönmez', role: 'Employee' as const },
      { email: 'tuba.eraslan@neonapps.com', name: 'Tuba Eraslan', role: 'Employee' as const },
      { email: 'sema.albayrak@neonapps.com', name: 'Sema Albayrak', role: 'Employee' as const },
      { email: 'gulsu.oz@neonapps.com', name: 'Gülsu Öz', role: 'Employee' as const },
      { email: 'ceyda.gok@neonapps.com', name: 'Ceyda Gök', role: 'Employee' as const },
      { email: 'merve.odabasi@neonapps.com', name: 'Merve Odabaşı', role: 'Employee' as const },
      { email: 'doga.dolekcekic@neonapps.com', name: 'Doğa Dölekçekiç', role: 'Employee' as const },
    ];

    const user = staffMembers.find(member => member.email === credentials.email);

    if (!user) {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }

    // Mock successful login
    return {
      success: true,
      user: {
        id: '1',
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }
};