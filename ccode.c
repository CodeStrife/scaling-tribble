bit_vector* create_runs_vector(char* string) {
	char* rbwt = reverse_bwt(string);
	bit_vector* runs = malloc(sizeof(bit_vector));
	init_bit_vector(runs, strlen(rbwt));

	runs->mark_bit(runs, 0);
	for (int i = 1; i < strlen(rbwt); i++) {
		if (rbwt[i - 1] != rbwt[i]) {
			runs->mark_bit(runs, i);
		}
	}
	return runs;
}

int is_reverse_interval_right_maximal(bit_vector* runs, Interval* interval) {
	if (interval->i >= interval->j)
		return 0;

	if (runs->rank_interval(runs, (interval->i) + 1, interval->j) > 0) {
		return 1;
	} else
		return 0;
}

Interval* update_reverse_interval(Interval* old_reverse, Interval* old_normal, Interval* normal,
		char* bwt, const char c);

substring* create_substring(Interval* normal, Interval* reverse, int length);

void iterate(char* string, void (*callback)(substring* substr)) {

	unsigned char* bwt = s_to_BWT(string);
	bit_vector* runs = create_runs_vector(string);

	substring_stack* stack = create_stack(10);
	
	max_repeats_initialize_bwt(bwt);

	Interval* normal = &((Interval ) { .i = 0, .j = strlen(bwt) - 1 } );
	Interval* reverse = &((Interval ) { .i = 0, .j = strlen(bwt) - 1 } );

	substring* start = &((substring) { .normal = normal, .reverse = reverse, .length = 0 });

	push(stack, start);
	substring* new_substring;
	substring* substring;

	while (1) {
		substring = pop(stack);

		if (substring == NULL)
			break;
			
		char* alphabet = create_alphabet_interval(substring->normal, bwt);
		int* c_array = create_c_array_interval(substring->normal, bwt);

		int i;
		for (i = 0; i < strlen(alphabet); i++) {

			Interval* normal = backward_search_interval(bwt, substring->normal,
					alphabet[i]);
			Interval* reverse = update_reverse_interval(substring->reverse,substring->normal,
					normal, bwt, alphabet[i]);

			if (is_reverse_interval_right_maximal(runs, reverse)) {
				new_substring = create_substring(normal, reverse, substring->length + 1);
				// callback function pointers
				callback(new_substring);
				push(stack, new_substring);
			} else {
				free(normal);
				free(reverse);
			}
		}
		free(alphabet);
		free(c_array);
	}
}

Interval* update_reverse_interval(Interval* old_reverse, Interval* old_normal, Interval* normal,
		char* bwt, const char c) {

	char* alphabet = create_alphabet_interval(old_normal, bwt);
	int* c_array = create_c_array_interval(old_normal, bwt);

	Interval* updated = malloc(sizeof(Interval));
	int i = old_reverse->i;
	int j = old_reverse->j;

	int char_index = get_char_index(c_array, alphabet, c);

	updated->i = i + char_index;

	updated->j = updated->i + (normal->j - normal->i);
	return updated;
}

substring* create_substring(Interval* normal, Interval* reverse, int length) {
	substring* new_substring = malloc(sizeof(substring));
	new_substring->normal = normal;
	new_substring->reverse = reverse;
	new_substring->length = length;
	return new_substring;
}
