import { StaffMember } from '@/types/staff';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StaffCardProps {
  member: StaffMember;
}

export const StaffCard: React.FC<StaffCardProps> = ({ member }) => {
  const { name, dept, zodiac } = member;

  const getDeptColor = (dept: string) => {
    switch (dept) {
      case 'Full Stack':
      case 'Full Stack Team Leader':
        return 'bg-neon-green text-white';
      case 'Flutter':
        return 'bg-neon-blue text-white';
      case 'Tasarım':
      case 'UI Design':
        return 'bg-neon-pink text-white';
      case 'Neon Appsin Medarı İftiharı':
        return 'bg-neon-yellow text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-center">{name}</CardTitle>
        <div className="flex justify-center">
          <Badge className={`${getDeptColor(dept)} font-medium`}>
            {dept}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Burç</p>
            <p className="font-medium text-neon-purple">{zodiac}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};