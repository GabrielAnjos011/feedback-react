import { FeedbackTypes, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeSteepProps {
  onFeedbackTypeChanged: (type: FeedbackTypes) => void;
}

export function FeedbackTypeSteep({
  onFeedbackTypeChanged,
}: FeedbackTypeSteepProps) {
  return (
    <>
      <header>
        <span className="text-xl left-6">Deixe seu Feedback</span>
        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-emerald-700 focus:border-emerald-700 focus:outline-none"
              onClick={() => onFeedbackTypeChanged(key as FeedbackTypes)}
              type="button"
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
