"use client";

import { JourneyMetrics } from "@/types/session";

interface JourneyAnalyticsProps {
  metrics: JourneyMetrics;
  onContinue: () => void;
}

/**
 * Post-session summary focused on exploration quality, not scores.
 * Philosophy: Celebrate the journey, not performance.
 */
export default function JourneyAnalytics({ metrics, onContinue }: JourneyAnalyticsProps) {
  const { wordsExplored, modesUsed, journeyQuality, totalDuration } = metrics;

  const durationMinutes = Math.floor(totalDuration / 60000);
  const durationSeconds = Math.floor((totalDuration % 60000) / 1000);

  // Quality-based encouragement
  const getJourneyMessage = () => {
    if (journeyQuality.journeyQuality === "category-defining") {
      return {
        title: "Remarkable exploration",
        message: "You engaged with words across multiple cognitive dimensions. This kind of varied exploration builds genuine mastery."
      };
    } else if (journeyQuality.modeDiversity >= 3) {
      return {
        title: "Solid exploration",
        message: "You experienced different ways of understanding these words. Each mode revealed a different facet."
      };
    } else {
      return {
        title: "Foundation built",
        message: "You've started mapping how these words work. Each interaction deepened your sense of their use."
      };
    }
  };

  const journeyMessage = getJourneyMessage();

  return (
    <div className="mobile-fit-screen md:min-h-screen flex items-center justify-center px-4 md:px-6 py-6 md:py-12 overflow-y-auto">
      <div className="max-w-3xl w-full">
        
        {/* Title */}
        <div className="mb-6 md:mb-12 text-center flex-shrink-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-stone-800 mb-3 md:mb-4">
            {journeyMessage.title}
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            {journeyMessage.message}
          </p>
        </div>

        {/* Journey overview */}
        <div className="mb-6 md:mb-12 p-4 md:p-8 bg-white rounded-2xl md:rounded-3xl border-2 border-stone-200 flex-shrink-0">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-medium text-stone-800 mb-1 md:mb-2">
                {wordsExplored.length}
              </div>
              <div className="text-xs md:text-sm text-stone-500">
                words explored
              </div>
            </div>
            
            <div>
              <div className="text-2xl md:text-3xl font-medium text-stone-800 mb-1 md:mb-2">
                {modesUsed.length}
              </div>
              <div className="text-xs md:text-sm text-stone-500">
                modes experienced
              </div>
            </div>
            
            <div>
              <div className="text-2xl md:text-3xl font-medium text-stone-800 mb-1 md:mb-2">
                {durationMinutes > 0 ? `${durationMinutes}m` : `${durationSeconds}s`}
              </div>
              <div className="text-xs md:text-sm text-stone-500">
                time invested
              </div>
            </div>
          </div>
        </div>

        {/* Words explored with modes */}
        <div className="mb-6 md:mb-12 flex-shrink overflow-y-auto">
          <h3 className="text-base md:text-lg font-medium text-stone-700 mb-4 md:mb-6 text-center flex-shrink-0">
            Your exploration path
          </h3>
          
          <div className="space-y-2 md:space-y-3">
            {wordsExplored.map((item, index) => (
              <div
                key={index}
                className="p-3 md:p-5 bg-white rounded-xl md:rounded-2xl border border-stone-200 flex items-center justify-between"
              >
                <div>
                  <div className="text-base md:text-lg font-medium text-stone-800">
                    {item.word}
                  </div>
                  <div className="text-xs md:text-sm text-stone-500 mt-0.5 md:mt-1">
                    {item.cognitiveWeight} • {item.mode} mode
                  </div>
                </div>
                
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 text-xs md:text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mode diversity insight */}
        {modesUsed.length >= 3 && (
          <div className="mb-6 md:mb-12 p-4 md:p-6 bg-stone-100 rounded-xl md:rounded-2xl flex-shrink-0">
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              💡 You experienced <strong>{modesUsed.length} different modes</strong>: {modesUsed.join(", ")}.
              This variety helps you understand words as living tools, not static definitions.
            </p>
          </div>
        )}

        {/* Continue button */}
        <div className="text-center flex-shrink-0">
          <button
            onClick={onContinue}
            className="px-8 py-3 md:px-12 md:py-4 bg-stone-800 text-white rounded-full font-medium text-base md:text-lg
              hover:bg-stone-900 transition-all duration-300 hover:shadow-xl"
          >
            Continue
          </button>
        </div>

        {/* Subtle philosophy */}
        <div className="mt-6 md:mt-12 text-center flex-shrink-0">
          <p className="text-xs text-stone-400 italic">
            Language shapes how you navigate reality.
          </p>
        </div>

      </div>
    </div>
  );
}
