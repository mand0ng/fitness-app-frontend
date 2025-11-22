import { IUser } from '@/context/user-context';
import { capitalizeFirstLetterArray, capitalizeFirstLetter, replaceUnderScoreWithSpace } from '@/utils/utils';

interface ReviewProps {
    userDetails: IUser | null;
    gotoStep: (step: number) => void;
}

const Review = ({ userDetails, gotoStep }: ReviewProps) => {

    return (
        <div className="flex flex-col items-center justify-items-center ">
            <h1 className="text-2xl font-bold text-center mb-3">
                Please Review Your Details
            </h1>
            <div className="flex flex-col gap-2 w-full">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col justify-between border border-(--muted) rounded-md p-2">
                        <p>Age: </p>
                        <p className="px-6 font-bold">{userDetails?.age}</p>
                    </div>
                    <div className="flex flex-col justify-between border border-(--muted) rounded-md p-2">
                        <p>Birth Gender: </p>
                        <p className="px-6 font-bold">{capitalizeFirstLetter(userDetails?.gender || '')}</p>
                    </div>
                    <div className="flex flex-col justify-between border border-(--muted) rounded-md p-2">
                        <p>Weight: </p>
                        <p className="px-6 font-bold">{userDetails?.weight}</p>
                    </div>
                    <div className="flex flex-col justify-between border border-(--muted) rounded-md p-2">
                        <p>Height: </p>
                        <p className="px-6 font-bold">{userDetails?.height}</p>
                    </div>
                    <div className="flex flex-col justify-between border border-(--muted) rounded-md p-2">
                        <p>Fitness Level: </p>
                        <p className="px-6 font-bold">{capitalizeFirstLetter(userDetails?.fitnessLevel || '')}</p>
                    </div>
                    <div className="flex flex-col justify-between border border-(--muted) rounded-md p-2">
                        <p>Fitness Goal:</p>
                        <p className="px-6 font-bold">{replaceUnderScoreWithSpace(capitalizeFirstLetter(userDetails?.fitnessGoal || ''))}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-between border border-(--muted) rounded-md p-2'>
                    <p>Days Availability:</p>
                    <div className="grid grid-cols-3 gap-2 px-6 font-bold">
                        {(capitalizeFirstLetterArray(userDetails?.daysAvailability?.map((day) => day) || [])).map((day) => (
                            <div key={day}>{`- ${day}`}</div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-between border border-(--muted) rounded-md p-2">
                    <p>Equipment Availability:</p>
                    <div className="grid grid-cols-3 gap-2 px-6 font-bold">
                        {(capitalizeFirstLetterArray(userDetails?.equipmentAvailability || []
                            .map((equipment) => equipment)
                        )).map((equipment) => (
                            <div key={equipment}>{`- ${replaceUnderScoreWithSpace(equipment)}`}</div>
                        ))}</div>
                </div>
                <div className="flex flex-col justify-between border border-(--muted) rounded-md p-2">
                    <p>Notes:</p>
                    <p className="font-bold">{userDetails?.notes}</p>
                </div>

                <div className="flex gap-6">
                    <button onClick={() => gotoStep(1)} className="mt-8 w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-md transition-colors">
                        Edit
                    </button>
                    <button onClick={() => gotoStep(5)} className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors">
                        Proceed
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Review;