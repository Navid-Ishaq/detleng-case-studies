def run_pipeline():

    load_config()

    validate_schema()

    create_dataset()

    create_table()

    load_data()

    write_log()

    print("Pipeline Completed")
