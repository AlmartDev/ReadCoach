def calculate_wpm(word_count: int, start_time: float, end_time: float) -> float:
    duration_minutes = (end_time - start_time) / 60
    if duration_minutes <= 0:
        return 0
    return round(word_count / duration_minutes, 2)

def calculate_gap(wpm: int): # time between two words
    return 60 * (1 / wpm)