import { IUser } from '@/context/user-context';
import { capitalizeFirstLetterArray, capitalizeFirstLetter, replaceUnderScoreWithSpace } from '@/utils/utils';

interface UserDetailsProps {
    user: IUser;
}

const UserDetails = ({ user }: UserDetailsProps) => {
    return (
        <div className="bg-(--card-background) border border-(--muted) rounded-lg shadow-lg p-6 mb-10">
            <h2 className="text-xl font-bold mb-4">Your Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className="flex justify-between border-b border-(--muted) py-2">
                        <span className="text-muted-foreground">Age:</span>
                        <span className="font-semibold">{user.age}</span>
                    </div>
                    <div className="flex justify-between border-b border-(--muted) py-2">
                        <span className="text-muted-foreground">Gender:</span>
                        <span className="font-semibold">{capitalizeFirstLetter(user.gender)}</span>
                    </div>
                    <div className="flex justify-between border-b border-(--muted) py-2">
                        <span className="text-muted-foreground">Weight:</span>
                        <span className="font-semibold">{user.weight} kg</span>
                    </div>
                    <div className="flex justify-between border-b border-(--muted) py-2">
                        <span className="text-muted-foreground">Height:</span>
                        <span className="font-semibold">{user.height} cm</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between border-b border-(--muted) py-2">
                        <span className="text-muted-foreground">Fitness Level:</span>
                        <span className="font-semibold">{capitalizeFirstLetter(user.fitnessLevel || '')}</span>
                    </div>
                    <div className="flex justify-between border-b border-(--muted) py-2">
                        <span className="text-muted-foreground">Goal:</span>
                        <span className="font-semibold">{replaceUnderScoreWithSpace(capitalizeFirstLetter(user.fitnessGoal || ''))}</span>
                    </div>
                    <div className="flex justify-between border-b border-(--muted) py-2">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-semibold">{replaceUnderScoreWithSpace(capitalizeFirstLetter(user.workoutLocation || ''))}</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <div className="border-b border-(--muted) py-2">
                    <span className="text-muted-foreground block mb-1">Availability:</span>
                    <div className="flex flex-wrap gap-2">
                        {capitalizeFirstLetterArray(user.daysAvailability || []).map((day) => (
                            <span key={day} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                {day}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="border-b border-(--muted) py-2">
                    <span className="text-muted-foreground block mb-1">Equipment:</span>
                    <div className="flex flex-wrap gap-2">
                        {capitalizeFirstLetterArray(user.equipmentAvailability || []).map((eq) => (
                            <span key={eq} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                {replaceUnderScoreWithSpace(eq)}
                            </span>
                        ))}
                    </div>
                </div>
                {user.notes && (
                    <div className="py-2">
                        <span className="text-muted-foreground block mb-1">Notes:</span>
                        <p className="text-sm italic">{user.notes}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
